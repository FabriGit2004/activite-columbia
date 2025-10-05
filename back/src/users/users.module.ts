// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Usuarios } from './entities/Usuarios'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
  ],
  controllers: [], 
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}