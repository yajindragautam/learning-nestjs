import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {MessagesModule} from './messages/messages.module';


async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe()); // Validation to all routes
  await app.listen(3000);
}
bootstrap();
