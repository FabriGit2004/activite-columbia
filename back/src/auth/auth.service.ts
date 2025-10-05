import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmPinDto } from './dto/confirm-pin.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  
  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Registro exitoso. Se envió un PIN de confirmación.',
      user,
    };
  }




  async confirmPin(confirmPinDto: ConfirmPinDto) {
    const { correo, pin } = confirmPinDto;

    const user = await this.usersService.findUserWithPassword(correo); 
    
    if (!user || user.verificado) { 
        throw new ConflictException('Usuario no encontrado o ya verificado.');
    }
    
    if (user.pinConfirmacion !== pin) { 
        throw new UnauthorizedException('PIN de confirmación incorrecto.');
    }

    await this.usersService.update(user.id, {
        verificado: true,
        pinConfirmacion: null,
    });

    return { message: 'Cuenta verificada correctamente. Ya puedes iniciar sesión.' };
  }




  async login(loginUserDto: LoginUserDto) {
    const { correo, password } = loginUserDto;

    const user = await this.usersService.findUserWithPassword(correo);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    if (!user.verificado) {
        throw new ForbiddenException('Cuenta no verificada. Por favor, confirma tu correo.');
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload: Payload = { id: user.id, correo: user.correo };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión exitoso',
      token: accessToken,
      user: { id: user.id, correo: user.correo, nombre: user.nombre },
    };
  }
}