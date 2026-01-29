import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Founder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @ManyToOne(() => Company, company => company.founderId)
    @JoinColumn()
    companyId: Company;
}