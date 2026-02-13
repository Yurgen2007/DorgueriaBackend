import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Notificaciones } from './entities/notificacione.entity';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { Elementos } from 'src/elementos/entities/elemento.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/auth/email/email.service';
import { stockBajoEmail, caducidadEmail } from 'src/auth/email/mail.body';
import { ConfigService } from '@nestjs/config';

interface MailCredentials {
  serviceMail: string;
  mailUser: string;
  mailPassword: string;
}

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private readonly notificacionRepository: Repository<Notificaciones>,
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
    private readonly websocketGateway: WebsocketGateway,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) { }

  async create(dto: CreateNotificacioneDto) {
    const usuario = await this.usuarioRepository.findOneByOrFail({
      idUsuario: dto.fkUsuario,
    });

    const nueva = this.notificacionRepository.create({
      titulo: dto.titulo,
      mensaje: dto.mensaje,
      requiereAccion: dto.requiereAccion,
      estado: dto.requiereAccion ? 'enProceso' : null,
      data: dto.data || {},
      fkUsuario: usuario,
    });

    return await this.notificacionRepository.save(nueva);
  }

  async findAll() {
    return this.notificacionRepository.find({
      relations: ['fkUsuario'],
      order: { createdAt: 'DESC' },
    });
  }

  async getNotificacionesPorUsuario(idUsuario: number) {
    const notificaciones = await this.notificacionRepository.find({
      where: { fkUsuario: { idUsuario } },
      order: { createdAt: 'DESC' },
    });

    // Obtener los ID de elementos de las notificaciones
    const idsElementos = notificaciones
      .map((n) => n.data?.idElemento)
      .filter((id) => !!id); // solo los que tengan idElemento

    // Consultar estado de esos elementos
    const elementos = await this.elementoRepository.find({
      where:
        idsElementos.length > 0
          ? { idElemento: In(idsElementos) }
          : {},
    });

    // Crear un mapa de idElemento => estado
    const estadoPorElemento: Record<number, boolean> = {};
    for (const el of elementos) {
      if (el.estado === true) {
        estadoPorElemento[el.idElemento] = true;
      }
    }

    // Filtrar las notificaciones con idElemento cuyo elemento este activo, o que no tengan idElemento
    return notificaciones.filter((n) => {
      const idEl = n.data?.idElemento;
      return !idEl || estadoPorElemento[idEl] === true;
    });
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionRepository.findOne({
      where: { idNotificacion: id },
      relations: ['fkUsuario'],
    });

    if (!notificacion) {
      throw new NotFoundException('Notificacion no encontrada');
    }

    return notificacion;
  }

  async update(id: number, dto: UpdateNotificacioneDto) {
    const updateData: any = { ...dto };
    if (dto.fkUsuario && typeof dto.fkUsuario === 'number') {
      updateData.fkUsuario = { idUsuario: dto.fkUsuario };
    }

    await this.notificacionRepository.update(id, updateData);
    return this.findOne(id);
  }

  async marcarComoLeida(id: number) {
    // En lugar de marcar como leida, eliminamos la notificacion
    return this.remove(id);
  }

  async cambiarEstado(id: number, estado: 'aceptado' | 'cancelado') {
    const notificacion = await this.findOne(id);

    if (!notificacion.requiereAccion) {
      throw new Error('Esta notificacion no requiere accion');
    }

    // Actualizamos el estado
    notificacion.estado = estado;
    notificacion.leido = true;

    // Guardamos la notificacion actualizada
    const notificacionActualizada = await this.notificacionRepository.save(notificacion);

    // Obtenemos el usuario logueado que creo el movimiento desde la notificacion original
    const usuarioCreador = await this.usuarioRepository.findOne({
      where: { idUsuario: notificacion.data.usuarioCreadorId }, // <- Guardaremos esto en data
    });

    if (usuarioCreador) {
      // Creamos la respuesta para el creador del movimiento
      const respuesta = this.notificacionRepository.create({
        titulo: estado === 'aceptado' ? 'Movimiento aceptado' : 'Movimiento rechazado',
        mensaje:
          estado === 'aceptado'
            ? `Tu movimiento  fue aceptado.`
            : `Tu movimiento fue rechazado.`,
        requiereAccion: false,
        estado,
        leido: false,
        fkUsuario: usuarioCreador,
        data: notificacion.data,
      });

      await this.notificacionRepository.save(respuesta);

      // Emitimos la notificacion en tiempo real al usuario creador
      this.websocketGateway.emitirNotificacion(usuarioCreador.idUsuario, respuesta);
    }

    return notificacionActualizada;
  }


  async remove(id: number) {
    const existe = await this.notificacionRepository.findOne({
      where: { idNotificacion: id },
    });
    if (!existe) throw new NotFoundException('Notificacion no encontrada');

    return this.notificacionRepository.remove(existe);
  }

  async enviarYGuardarNotificacion(
    titulo: string,
    mensaje: string,
    requiereAccion: boolean,
    usuario: Usuarios,
    data: any = {},
    estado?: 'enProceso' | 'aceptado' | 'cancelado',
  ) {
    const notificacion = this.notificacionRepository.create({
      titulo,
      mensaje,
      requiereAccion,
      estado: requiereAccion ? (estado ?? 'enProceso') : null,
      data,
      leido: false,
      fkUsuario: usuario,
    });
    const guardada = await this.notificacionRepository.save(notificacion);

    console.log('Emision WS:', {
      usuario: usuario.idUsuario,
      notificacion: guardada,
    });

    this.websocketGateway.emitirNotificacion(usuario.idUsuario, guardada);
  }

  async notificarMovimientoPendiente(movimiento: any) {
    console.log('Iniciando notificacion de movimiento pendiente');
    console.log('Tipo de movimiento recibido:', movimiento.tipo?.nombre);
    console.log(
      'Usuario que creo el movimiento:',
      movimiento.usuario?.nombre,
      `(ID: ${movimiento.usuario?.idUsuario})`,
    );

    const tipoNombre = movimiento.tipo?.nombre?.toLowerCase?.();
    console.log('tipoNombre (normalizado):', tipoNombre);

    if (!tipoNombre) {
      console.log(
        'No se pudo determinar el tipo de movimiento. Cancelando notificacion.',
      );
      return;
    }

    if (!['salida', 'prestamo'].includes(tipoNombre)) {
      console.log(
        `Tipo de movimiento "${tipoNombre}" no requiere notificacion pendiente.`,
      );
      return;
    }

    console.log(
      `Tipo "${tipoNombre}" requiere notificacion. Buscando receptores...`,
    );

    const receptores = await this.usuarioRepository.find({
      where: [
        { fkRol: { nombre: 'Administrador' } },
        { fkRol: { nombre: 'Vendedor' } },
      ],
      relations: ['fkRol'],
    });

    console.log(
      'Receptores encontrados:',
      receptores.map((r) => `${r.nombre} (${r.fkRol?.nombre})`),
    );

    if (!receptores || receptores.length === 0) {
      console.log('No se encontraron receptores para notificacion.');
      return;
    }

    const mensaje = `Movimiento de tipo ${movimiento.tipo.nombre} realizado por el usuario ${movimiento.usuario.nombre}. Requiere revision.`;

    for (const user of receptores) {
      console.log(
        `Enviando notificacion a: ${user.nombre} (ID: ${user.idUsuario})`,
      );

      await this.enviarYGuardarNotificacion(
        'Movimiento pendiente',
        mensaje,
        true,
        user,
        { idMovimiento: movimiento.idMovimiento },
        'enProceso',
      );

      console.log(`Notificacion enviada a ${user.nombre}`);
    }

    console.log('Notificacion de movimiento pendiente finalizada.');
  }

  async notificarIngreso(movimiento: any) {
    if (movimiento.tipo.nombre.toLowerCase() === 'ingreso') {
      const admins = await this.usuarioRepository.find({
        where: {
          fkRol: { nombre: 'Administrador' },
        },
        relations: ['fkRol'],
      });
      const vendedores = await this.usuarioRepository.find({
        where: {
          fkRol: { nombre: 'Vendedor' },
        },
      });

      const mensaje = `Se realizo el Ingreso de ${movimiento.cantidad} elemento de nombre "${movimiento.elemento.nombre}" realizado por el usuario ${movimiento.usuario.nombre} al sitio ${movimiento.sitio.nombre}.`;

      for (const admin of admins) {
        await this.enviarYGuardarNotificacion(
          'Ingreso registrado',
          mensaje,
          false,
          admin,
          {
            idMovimiento: movimiento.id,
          },
        );
      }

      for (const vendedor of vendedores) {
        await this.enviarYGuardarNotificacion(
          'Ingreso registrado',
          mensaje,
          false,
          vendedor,
          {
            idMovimiento: movimiento.id,
          },
        );
      }
    }
  }

  // Metodo para buscar administradores y vendedores de forma case-insensitive
  private async buscarAdministradores(): Promise<Usuarios[]> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoin('usuario.fkRol', 'rol')
      .where('LOWER(rol.nombre) IN (:...nombres)', { nombres: ['administrador', 'vendedor'] })
      .getMany();
  }

  private async getMailCredentials(): Promise<MailCredentials> {
    // Buscar un usuario (administrador o vendedor) con credenciales configuradas
    const usuarioConCredenciales = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoin('usuario.fkRol', 'rol')
      .where('LOWER(rol.nombre) IN (:...nombres)', { nombres: ['administrador', 'vendedor'] })
      .andWhere('usuario.serviceMail IS NOT NULL')
      .andWhere('usuario.mailUser IS NOT NULL')
      .andWhere('usuario.mailPassword IS NOT NULL')
      .getOne();

    if (usuarioConCredenciales && usuarioConCredenciales.serviceMail && usuarioConCredenciales.mailUser && usuarioConCredenciales.mailPassword) {
      return {
        serviceMail: usuarioConCredenciales.serviceMail,
        mailUser: usuarioConCredenciales.mailUser,
        mailPassword: usuarioConCredenciales.mailPassword,
      };
    }

    // Fallback a variables de entorno
    return {
      serviceMail: this.configService.get('SERVICE_MAIL') || 'gmail',
      mailUser: this.configService.get('MAIL_USER') || '',
      mailPassword: this.configService.get('MAIL_PASSWORD') || '',
    };
  }

  async notificarStockBajo(elemento: any) {
    // Verificar si el elemento esta activo (estado true o null)
    if (elemento.estado === false) {
      console.log(`Elemento ${elemento.nombre} esta inactivo, saltando notificacion de stock`);
      return;
    }
    
    console.log(`Verificando stock bajo para: ${elemento.nombre}, stock actual: ${elemento.stock}`);
    
    if (elemento.stock <= 5) {
      console.log(`Stock bajo detectado: ${elemento.nombre} tiene ${elemento.stock} unidades`);

      const admins = await this.buscarAdministradores();

      if (admins.length === 0) {
        console.log('No hay administradores para notificar stock bajo');
        return;
      }

      const mensaje = `Stock Bajo: El elemento "${elemento.nombre}" tiene ${elemento.stock} unidades.`;

      for (const admin of admins) {
        console.log('Enviando notificacion de stock a:', admin.idUsuario);
        await this.enviarYGuardarNotificacion(
          '⚠️ Stock bajo',
          mensaje,
          false,
          admin,
          {
            idElemento: elemento.idElemento,
            stock: elemento.stock,
            nombreElemento: elemento.nombre,
            codigoBarras: elemento.codigoBarras,
          },
        );
        // Enviar correo
        try {
          const credentials = await this.getMailCredentials();
          await this.emailService.sendMail({
            to: admin.correo,
            subject: '⚠️ Alerta de Stock Bajo - FarmaMedica',
            html: stockBajoEmail(elemento.nombre, elemento.stock, elemento.codigoBarras),
          }, credentials);
          console.log(`Correo de stock bajo enviado a ${admin.correo}`);
        } catch (error) {
          console.error('Error enviando correo de stock bajo:', error);
        }
      }
    } else {
      console.log(`Stock OK: ${elemento.nombre} tiene ${elemento.stock} unidades (umbral: 5)`);
    }
  }

  async notificarProximaCaducidad(elemento: any) {
    // Verificar si el elemento esta activo (estado true o null)
    if (elemento.estado === false) {
      console.log(`Elemento ${elemento.nombre} esta inactivo, saltando notificacion de caducidad`);
      return;
    }

    if (!elemento.fechaVencimiento) {
      console.log(`Elemento ${elemento.nombre} no tiene fecha de vencimiento`);
      return;
    }

    const hoy = new Date();
    const fechaCaducidad = new Date(elemento.fechaVencimiento);
    const diasRestantes = Math.ceil(
      (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
    );

    console.log(`Verificando caducidad para: ${elemento.nombre}, dias restantes: ${diasRestantes}`);

    if (diasRestantes <= 15 && diasRestantes >= 0) {
      console.log(`Caducidad proxima: ${elemento.nombre} caduca en ${diasRestantes} dias`);

      const admins = await this.buscarAdministradores();

      if (admins.length === 0) {
        console.log('No hay administradores para notificar caducidad');
        return;
      }

      const mensaje = `El elemento "${elemento.nombre}" caduca en ${diasRestantes} dias (${fechaCaducidad.toLocaleDateString()}).`;

      for (const admin of admins) {
        await this.enviarYGuardarNotificacion(
          '🗓️ Elemento por caducar',
          mensaje,
          false,
          admin,
          {
            idElemento: elemento.idElemento,
            fechaCaducidad: elemento.fechaVencimiento,
            diasRestantes,
            nombreElemento: elemento.nombre,
            codigoBarras: elemento.codigoBarras,
          },
        );
        // Enviar correo
        try {
          const credentials = await this.getMailCredentials();
          await this.emailService.sendMail({
            to: admin.correo,
            subject: '🗓️ Alerta de Caducidad Proxima - FarmaMedica',
            html: caducidadEmail(elemento.nombre, diasRestantes, elemento.fechaVencimiento, elemento.codigoBarras),
          }, credentials);
          console.log(`Correo de caducidad enviado a ${admin.correo}`);
        } catch (error) {
          console.error('Error enviando correo de caducidad:', error);
        }
      }
    } else if (diasRestantes > 15) {
      console.log(`Caducidad OK: ${elemento.nombre} tiene ${diasRestantes} dias (umbral: 15)`);
    } else {
      console.log(`Elemento ${elemento.nombre} ya vencio (hace ${Math.abs(diasRestantes)} dias)`);
    }
  }


  async notificarMovimientoAceptado(movimiento: any) {
    if (!movimiento?.usuario) return;

    const mensaje = `Tu movimiento de tipo "${movimiento.tipo.nombre}" ha sido aceptado.`;

    await this.enviarYGuardarNotificacion(
      'Movimiento aceptado',
      mensaje,
      false,
      movimiento.usuario,
      { idMovimiento: movimiento.idMovimiento },
    );
  }

  async notificarPrestamoConDevolucion(movimiento: any) {
    if (
      !movimiento?.usuario ||
      movimiento?.tipo?.nombre?.toLowerCase() !== 'prestamo'
    )
      return;

    const fecha = movimiento.fechaDevolucion
      ? new Date(movimiento.fechaDevolucion).toLocaleDateString('es-ES')
      : 'sin fecha definida';

    const mensaje = `Recuerda devolver el elemento "${movimiento.elemento.nombre}" antes del ${fecha}.`;

    await this.enviarYGuardarNotificacion(
      'Prestamo registrado',
      mensaje,
      false,
      movimiento.usuario,
      {
        idMovimiento: movimiento.idMovimiento,
        fechaDevolucion: movimiento.fechaDevolucion,
      },
    );
  }

  async verificarInventariosYNotificar() {
    console.log('Iniciando verificacion de inventarios...');
    
    const elementos = await this.elementoRepository.find();
    console.log(`Elementos encontrados: ${elementos.length}`);
    
    for (const el of elementos) {
      console.log(`\nVerificando elemento: ${el.nombre} (ID: ${el.idElemento})`);
      console.log(`   Stock: ${el.stock}, Estado: ${el.estado}`);
      console.log(`   FechaVencimiento: ${el.fechaVencimiento}`);
      
      await this.notificarStockBajo(el);
      await this.notificarProximaCaducidad(el);
    }
    
    console.log('\nVerificacion de inventarios completada');
  }
}
