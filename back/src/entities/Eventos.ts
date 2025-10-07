import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("eventos_pkey", ["id"], { unique: true })
@Entity("eventos", { schema: "public" })
export class Eventos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("character varying", { name: "lugar", nullable: true, length: 255 })
  lugar: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_de_envio",
    nullable: true,
  })
  fechaDeEnvio: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.eventos)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
