import {Body ,Controller, Post, Get, Patch,Param,Query, Delete, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.sto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){
      const user = await this.userService.findOne(parseInt(id));
      if(!user){
        throw new NotFoundException('User not found');
      }
      return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser( @Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }

}
