import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'stock',
})
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;//1

    @Column()
    name: string; //hpg

    @Column()
    price: number;//22
}
