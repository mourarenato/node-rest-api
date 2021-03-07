import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from "typeorm";

const hash = require('crypto');

export interface IUser {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "jsonb", width: 200, nullable: true })
    username!: string;

    @Column({type: "varchar", width: 100, nullable: true })
    firstName!: string;

    @Column({type: "varchar", width: 100, nullable: true })
    lastName!: string;

    @Column({type: "varchar", width: 255 })
    email!: string;

    @Column({ type: "jsonb", width: 255 })
    password!: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    encryptPassword() {
        if (this.password) {
        this.password = hash.createHmac('sha256', this.password).digest('hex');
        }
    }
}
