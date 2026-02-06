import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inventarios } from "../../inventarios/entities/inventario.entity";
import { Elementos } from "../../elementos/entities/elemento.entity";

@Entity("sitios", { schema: "public" })
export class Sitios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sitio" })
  idSitio: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", { name: "estante", nullable: true, length: 20 })
  estante: string | null;

  @Column("character varying", { name: "pasillo", nullable: true, length: 20 })
  pasillo: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Elementos, (elementos) => elementos.fkSitio)
  elementos: Elementos[];
}
