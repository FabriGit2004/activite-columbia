import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Debe proporcionar un correo válido para iniciar sesión.' })
  correo: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string;
}