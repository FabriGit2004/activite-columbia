import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuarios } from './entities/Usuarios';
import { CreateUserDto } from '../auth/dto/create-user.dto'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuarios)
    private usersRepository: Repository<Usuarios>,
  ) {}

  async findUserWithPassword(correo: string): Promise<Usuarios | null> {
    return this.usersRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.correo = :correo', { correo })
      .addSelect('usuarios.passwordHash') 
      .getOne();
  }

  async findOneById(id: number): Promise<Usuarios | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);
      const pinConfirmacion = Math.floor(100000 + Math.random() * 900000).toString();

      const newUser = this.usersRepository.create({
        ...createUserDto,
        passwordHash,
        pinConfirmacion,
        verificado: false,
      });

      await this.usersRepository.save(newUser);
      
      const { passwordHash: _, pinConfirmacion: __, ...result } = newUser;
      return result;

    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El correo ya está registrado.');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, data: Partial<Usuarios>): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }
}