import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscriptores } from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suscriptores])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
