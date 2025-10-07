// src/whatsapp/dto/send-whatsapp.dto.ts

import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum, IsNumberString } from 'class-validator';

// Usamos IsNumberString si el managerId viene del frontend como string (de la cookie)
// y IsString para el teléfono, asumiendo que ya está en formato E.164.

export enum MediaType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  // Añade otros tipos según lo soporte la API de Meta
}

export class SendWhatsappDto {
  
  @IsNotEmpty()
  @IsString()
  managerId: string; // ID del Manager obtenido de la cookie (userId)

  @IsNotEmpty()
  @IsString()
  // Asumimos que el teléfono viene en formato E.164 (ej: +595981123456)
  toPhone: string; 

  @IsNotEmpty()
  @IsString()
  templateName: string; // Ej: 'TEXTO_SIMPLE_INFORMATIVO'

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  // Esperamos 2 elementos: [Nombre del Suscriptor, Mensaje Editable]
  templateParameters: string[]; 

  @IsOptional()
  @IsString()
  mediaUrl?: string; // URL pública del archivo (si es MEDIA_HEADER)

  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType; // Ej: 'image'

  @IsNotEmpty()
  @IsString()
  languageCode: string; // Ej: 'es_AR'
}