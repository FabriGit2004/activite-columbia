import { 
    Controller, 
    Post, 
    Get, 
    Body, 
    Patch, 
    Param, 
    UsePipes, 
    ValidationPipe, 
    UseGuards,
    Req, 
    NotFoundException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmPinDto } from './dto/confirm-pin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { Usuarios } from '../users/entities/Usuarios';


// Interfaz para tipar el objeto 'user' inyectado por el Guard
interface AuthenticatedRequest extends Request {
    user: { id: number; correo: string }; 
}

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

    // --- FUNCIÓN CONFIRM REINCORPORADA ---
    @Post('confirm')
    confirmPin(@Body() confirmPinDto: ConfirmPinDto) {
        return this.authService.confirmPin(confirmPinDto);
    }
    // ------------------------------------

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    // --- NUEVO ENDPOINT /ME ---
    @UseGuards(AuthGuard('jwt')) 
    @Get('me') // Usamos GET y protegemos con JWT
    async whoAmI(@Req() req: AuthenticatedRequest) {
        // Obtenemos el ID del token JWT
        const userId = req.user.id; 

        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return user; // Devuelve los datos del usuario logueado
    }
    // --------------------------

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