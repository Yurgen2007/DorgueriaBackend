import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Elementos } from '../../elementos/entities/elemento.entity';

@Entity('caracteristicas', { schema: 'public' })
export class Caracteristicas {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_caracteristica' })
  idCaracteristica: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string | null;

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

  @OneToMany(() => Elementos, (elementos) => elementos.fkCaracteristica)
  elementos: Elementos[];
}
