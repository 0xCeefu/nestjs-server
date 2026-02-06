import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

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

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @Column({nullable: true})
    hashedRefreshToken: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
