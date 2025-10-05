import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El campo nombre es obligatorio.' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser una dirección de email válida.' })
  correo: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string; 
  
  // Nota: No incluimos 'pinConfirmacion' ni 'verificado' aquí, 
  // ya que son generados por el backend, no enviados por el cliente.
}