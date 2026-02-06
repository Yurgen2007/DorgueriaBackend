import { Elementos } from "../../elementos/entities/elemento.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("codigo_inventario", { schema: "public" })
export class CodigoInventario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_codigo_inventario" })
  idCodigoInventario: number;

  @Column({ type: 'text', name: 'codigo' })
  codigo: string

  @Column({ type: 'boolean', name: 'uso', default: false })
  uso: boolean

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: 'timestamp',
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Elementos, (elemento) => elemento.codigos)
  @JoinColumn([{ name: "fk_elemento", referencedColumnName: "idElemento" }])
  fkElemento: Elementos;

  
}


