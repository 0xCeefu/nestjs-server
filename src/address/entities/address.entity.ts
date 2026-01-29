import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @OneToOne(() => Company, company => company.addressId)
    @JoinColumn()
    companyId: Company;
}