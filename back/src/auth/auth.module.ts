import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Importar ConfigService

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; 
import { JwtStrategy } from './jwt.strategy'; // 👈 Asumimos que esta clase existe

@Module({
  imports: [
    UsersModule, 
    ConfigModule, // 👈 Aseguramos que el ConfigModule esté disponible
    
    // 1. Configuración de Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // 2. Configuración de JWT de forma ASÍNCRONA para leer el secreto
    JwtModule.registerAsync({
      imports: [ConfigModule], // Especificamos la dependencia
      useFactory: (configService: ConfigService) => ({
        // Obtenemos el secreto de forma segura. Si falla, el error es porque
        // no está en el .env, no por la carga.
        secret: configService.get<string>('JWT_SECRET', 'yourFallbackSecret'), // Usamos un fallback por si acaso
        signOptions: { 
          expiresIn: '1h', 
        },
      }),
      inject: [ConfigService], // Inyectamos el servicio para usarlo en useFactory
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy // 👈 Añadimos la estrategia para que Nest la registre
  ],
  exports: [
    PassportModule, 
    JwtModule,
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}