import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    private saltRounds = 10;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, this.saltRounds);
    }

    @Column()
    password: string;

    @Column()
        // tslint:disable-next-line:variable-name
    created_at: string;
}
