import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import './patch';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('OCMI Dmillan App')
    .setDescription('Swagger API Definition')
    .setVersion('1.0.1')
    .addTag('Auth')
    .addTag('Customers')
    .addTag('Employees')
    .addTag('Logs')
    .addTag('Modules')
    .addTag('Roles')
    .addTag('Timesheets')
    .addTag('Users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const port = process.env.NEST_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
