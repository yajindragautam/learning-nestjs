import {AfterInsert,AfterRemove,AfterUpdate,Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

// User Entity
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;
    
    @Column()
    password: string;

    @AfterInsert()
    logInsert(){
        console.log('Data Inserted with user id : ', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Data Update with id :', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Data removed with id : ', this.id);
    }
}