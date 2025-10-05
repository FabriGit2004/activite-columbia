import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; 
// Importaremos la estrategia JWT aquí cuando la implementemos

@Module({
  imports: [
    // 1. Necesita acceder a UsersService (que está exportado en UsersModule)
    UsersModule, 
    
    // 2. Configuración de Passport para estrategias de autenticación
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // 3. Configuración de JWT (JSON Web Tokens)
    JwtModule.register({
      // ¡IMPORTANTE! Usa una variable de entorno segura en producción
      secret: process.env.JWT_SECRET || 'yourStrongSecretKey', 
      signOptions: { 
        expiresIn: '1h', // Duración del token
      },
    }),
  ],
  controllers: [AuthController], // Expone las rutas de login/registro
  providers: [
    AuthService,
    // JwtStrategy // <-- Aquí se añadiría la estrategia JWT
  ],
  exports: [
    PassportModule, 
    JwtModule,
    AuthService,
  ]
})
export class AuthModule {}