import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateSubscriberDto {
  @IsInt({ message: 'El usuarioId debe ser un número entero válido.' })
  usuarioId: number; // para relacionar el suscriptor con un usuario

  @IsString({ message: 'El nombre es obligatorio y debe ser un texto.' })
  nombre: string;

  @IsString({ message: 'El teléfono es obligatorio y debe ser un texto.' })
  telefono: string;

  @IsEmail({}, { message: 'El email debe ser válido.' })
  email: string;

  @IsOptional()
  fechaRegistro?: Date; // si querés que se genere automáticamente, podés omitirlo
}
