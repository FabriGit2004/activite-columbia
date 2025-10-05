import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

// 🚨 Necesitas instalar @nestjs/mapped-types si no lo has hecho:
// npm install @nestjs/mapped-types

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Nota: Los campos 'nombre', 'correo' y 'password' ya son opcionales y validados por 'PartialType'.

  // Solo añadimos campos que son exclusivos de la actualización de la DB:
  
  @IsOptional()
  @IsString()
  pinConfirmacion?: string | null;

  @IsOptional()
  verificado?: boolean;
}