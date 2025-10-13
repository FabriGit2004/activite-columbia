import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; 
import { ValidationPipe } from '@nestjs/common';
  
dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


  // app.enableCors({
  //   origin: 'http://localhost:3000', // el puerto del FRONTEND
  //   methods: 'GET,PATCH,POST,OPTIONS,DELETE',
  //   credentials: true,
  // });

  app.enableCors({
  origin: 'https://activite.online',
  methods: 'GET,PATCH,POST,OPTIONS,DELETE',
  credentials: true,
  });




  const port = process.env.PORT ?? 3001; // el puerto del BACKEND
  await app.listen(port);

  console.log(`🚀 Backend running on ${await app.getUrl()}`);
}
bootstrap();
