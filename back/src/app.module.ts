import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import the feature modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; 

// Import your User Entity (needed for TypeORM to know which entities to use)
import { Usuarios } from './users/entities/Usuarios'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import  {Eventos} from './events/entities/event.entity';
import { SubscribersModule } from './subscribers/subscribers.module';
import { Suscriptores } from './subscribers/entities/subscriber.entity';
import { WhatsappModule } from './whatsapp/whatsapp.module';




@Module({
  imports: [
    // 1. Configuration Module (usually global)
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Database Connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt((process.env.DB_PORT ?? "5432")),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'nest_login_db',
      
      // List the entities here
      entities: [Usuarios, Eventos, Suscriptores], 
      
      synchronize: false, 
    }),
    
    // 3. Import your feature modules
    UsersModule,
    AuthModule,
    EventsModule,
    SubscribersModule,
    WhatsappModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}