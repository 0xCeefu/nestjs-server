import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../address/entities/address.entity";
import { Founder } from "../../founders/entities/founder.entity";
import { Tag } from "../../tag/entities/tag.entity";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    industry: string;

    @Column()
    country: string;

    @Column()
    isSeekingFunding: boolean;

    @OneToOne(() => Address, address => address.companyId)
    addressId: Address;

    @OneToMany(() => Founder, founder => founder.companyId)
    founderId: Founder[];

    @ManyToMany(() => Tag, tag => tag.companies)
    @JoinTable({name: 'company_tags'})
    tags: Tag[];
}