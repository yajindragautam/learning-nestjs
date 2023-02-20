import { BadRequestException, Injectable,NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import {randomBytes, scrypt as _scrypt} from 'crypto'
import {promisify} from 'util'

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UsersService){}

    async signup(email: string, password:string){
        // See if the email is in user
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('Email is user');
        }
        // Hash the users password
        // Generate a saly
        const salt = randomBytes(8).toString('hex');
        // Hash the salt and the password together
        const hash = await scrypt(password, salt,32) as Buffer;
        // Join the hashed result and the saly together
        const result = salt + "." + hash.toString('hex');
        // Create a new user and save it
        const user = await this.userService.create(email, result);
        // return the user
        return user;
    }

    async signin(email:string, password:string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('user not found');
        }
        const [salt, storedHash] = user.password.split('.');
        
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password');
        }
        return user;
    }

}