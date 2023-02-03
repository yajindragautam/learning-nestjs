import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

// User Entity
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;
    
    @Column()
    password: string;
}