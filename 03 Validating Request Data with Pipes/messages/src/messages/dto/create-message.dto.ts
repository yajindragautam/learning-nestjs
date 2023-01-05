import {IsString} from 'class-validator';
// Boday validation

export class CreateMessageDto {
    @IsString()
    content:string;
}