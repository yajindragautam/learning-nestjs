import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthService } from './aut.service';
import { CurrentUserInterception } from './interceptors/current-user.interceptor';
import { User } from './user.entity'; // User entity is licke user table
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterception
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
