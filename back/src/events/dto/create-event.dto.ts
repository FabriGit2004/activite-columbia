import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'El título es obligatorio y debe ser un texto.' })
  titulo: string;

  @IsDateString({}, { message: 'La fecha es obligatoria y debe tener un formato válido (YYYY-MM-DD).' })
  fecha: string;

  @IsString({ message: 'El lugar debe ser un texto válido.' })
  @IsOptional()
  lugar?: string;

  @IsDateString({}, { message: 'La fecha de envío debe ser una fecha válida (YYYY-MM-DD).' })
  @IsOptional()
  fechaDeEnvio?: string;

  @IsInt({ message: 'El usuarioId debe ser un número entero válido.' })
  usuarioId: number;
}
