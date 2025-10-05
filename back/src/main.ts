import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // el puerto del FRONTEND
    methods: 'GET,PATCH,POST',
    credentials: true,
  });

  const port = process.env.PORT ?? 3001; // el puerto del BACKEND
  await app.listen(port);

  console.log(`🚀 Backend running on ${await app.getUrl()}`);
}
bootstrap();
