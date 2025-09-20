import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { CCCD } from "./CCCD"
import { Feed } from "./Feed"

@Entity()
export class User {
    /**
     * cascade in typeorm can put on both sides
     * but cascade(onDelete:'CASCADE') in db is only on the many side(foreign key side)
     * cascade should be putted on onetoMany side in typeorm
     * 
     */

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @OneToMany(() => Feed, feed => feed.user, {
        cascade: true,
        //cascade:['remove']// khi xóa user thì xóa feed (cascade delete in typeorm level)
        //  equal onDelete:'CASCADE' in db level, feed

    })
    feeds: Feed[];

}
