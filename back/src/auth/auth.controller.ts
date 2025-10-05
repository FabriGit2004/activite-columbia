import { Controller, Post, Get, Body, Patch, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmPinDto } from './dto/confirm-pin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { Usuarios } from '../users/entities/Usuarios';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, 
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('confirm')
  confirmPin(@Body() confirmPinDto: ConfirmPinDto) {
    return this.authService.confirmPin(confirmPinDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string, 
    @Body() updateAuthDto: UpdateUserDto, 
  ) {
    const updateData: Partial<Usuarios> = {
        nombre: updateAuthDto.nombre,
        correo: updateAuthDto.correo,
    };

    return this.usersService.update(+id, updateData); 
  }
}