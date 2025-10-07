import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("suscriptores_pkey", ["id"], { unique: true })
@Entity("suscriptores", { schema: "public" })
export class Suscriptores {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 70 })
  email: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "now()",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.suscriptores)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
