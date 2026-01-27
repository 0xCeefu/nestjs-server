import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    continent: string;

    @Column()
    isSeekingFunding: boolean;
}