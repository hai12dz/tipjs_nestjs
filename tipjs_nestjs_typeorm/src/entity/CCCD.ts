import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";


@Entity()
export class CCCD {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 12,
        unique: true,
        nullable: false,
    })
    cccd_no: string;

    @JoinColumn()
    @OneToOne(() => User, {
        cascade: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    user: User;
}
