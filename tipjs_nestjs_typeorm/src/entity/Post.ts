import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;


    @JoinTable({
        name: "post_tags",
        // tên bảng trung gian
    })
    @ManyToMany(() => Tag, { cascade: true })
    tags: Tag[];



}