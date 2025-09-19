import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { CCCD } from "./CCCD"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToOne(() => CCCD, cccd => cccd.user)
    cccd: CCCD

}
