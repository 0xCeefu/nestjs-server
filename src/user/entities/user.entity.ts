import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: false, default: 'defaultPassword'})
    password: string;

    @Column({nullable: true})
    hashedRefreshToken: string;

    @Column({default: 'user'})
    role: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
