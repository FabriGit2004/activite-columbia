import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ConfirmPinDto {
  @IsEmail({}, { message: 'Debe proporcionar un correo válido.' })
  correo: string;

  @IsNotEmpty({ message: 'El PIN de confirmación es obligatorio.' })
  @IsString({ message: 'El PIN debe ser una cadena de texto.' })
  @Length(6, 6, { message: 'El PIN debe tener exactamente 6 caracteres.' }) // Ajusta el Length si tu PIN es diferente
  pin: string;
}