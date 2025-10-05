import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("usuarios_correo_key", ["correo"], { unique: true })
@Index("usuarios_pkey", ["id"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "correo", unique: true, length: 255 })
  correo: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", {
    name: "pin_confirmacion",
    nullable: true,
    length: 10,
  })
  pinConfirmacion: string | null;

  @Column("boolean", { name: "verificado", default: () => "false" })
  verificado: boolean;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    default: () => "now()",
  })
  fechaRegistro: Date;
}
