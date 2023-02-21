import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({
    keys:['anykeys']
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  )
  await app.listen(4000);
}
bootstrap();
