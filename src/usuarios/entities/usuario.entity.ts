import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/role.entity';
import { Notificaciones } from '../../notificaciones/entities/notificacione.entity';

@Entity('usuarios', { schema: 'public' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column('integer', { name: 'documento', nullable: true, unique: true })
  documento: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string;

  @Column('character varying', { name: 'apellido', nullable: true, length: 70 })
  apellido: string;

  @Column('integer', { name: 'edad', nullable: true })
  edad: number;

  @Column('character varying', { name: 'telefono', nullable: true, length: 15 })
  telefono: string;

  @Column('character varying', { name: 'correo', nullable: true, length: 70 })
  correo: string;

  @Column('boolean', { name: 'estado', nullable: true })
  estado: boolean;

  @Column('character varying', { name: 'cargo', nullable: true, length: 70 })
  cargo: string;

  @Column('character varying', { name: 'password', nullable: true, length: 60 })
  password: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('character varying', { name: 'perfil', nullable: true, length: 255 })
  perfil: string;

  @Column('character varying', { name: 'service_mail', nullable: true, length: 50 })
  serviceMail: string;

  @Column('character varying', { name: 'mail_user', nullable: true, length: 100 })
  mailUser: string;

  @Column('character varying', { name: 'mail_password', nullable: true, length: 255 })
  mailPassword: string;

  @ManyToOne(() => Roles, (roles) => roles.usuarios)
  @JoinColumn([{ name: 'fk_rol', referencedColumnName: 'idRol' }])
  fkRol: Roles;

  @OneToMany(() => Notificaciones, (notificaciones) => notificaciones.fkUsuario)
  notificaciones: Notificaciones[];
  static nombre: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
