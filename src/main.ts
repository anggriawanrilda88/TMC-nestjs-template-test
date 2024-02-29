import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';
import { validationExceptionFactory } from './shared/validation.execption';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );
  // define useContainer
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}

bootstrap();
