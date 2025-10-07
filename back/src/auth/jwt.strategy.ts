import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; 

import { UsersService } from '../users/users.service';

interface Payload {
  id: number;
  correo: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService, 
  ) {
    // Definimos el secreto, usando un fallback y forzando el tipo para satisfacer TypeScript.
    const secret = configService.get<string>('JWT_SECRET');

    // 1. Añadimos una comprobación de seguridad en tiempo de ejecución
    if (!secret) {
        throw new Error('La clave JWT_SECRET no se pudo cargar desde ConfigService. Verifica tu .env.');
    }

    // 2. Pasamos la clave al super
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Usamos el valor 'secret', que ahora está garantizado de ser un string.
      // TypeScript queda satisfecho.
      secretOrKey: secret, 
    });
  }

  // ... (El método validate se mantiene igual) ...
  async validate(payload: Payload) {
    const user = await this.usersService.findOneById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Token inválido: Usuario no existe.');
    }
    
    return { id: user.id, correo: user.correo }; 
  }
}