import {Body ,Controller, Post, Get, Patch,Param,Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.sto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './aut.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService 
    ){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto){
        this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    signin(@Body() body : CreateUserDto){
        this.authService.signin(body.email, body.password);
    }

    // @UseInterceptors(new SerializerInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string){
        console.log('handler is running');
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
