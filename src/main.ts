import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API documentation for Users, Roles & Auth')
    .setVersion('1.0')
    .addBearerAuth() // 🔐 Enables JWT Authorization button
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
