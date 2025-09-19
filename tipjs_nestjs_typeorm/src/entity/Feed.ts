import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Feed {

    /**
     * if you put cascade on both sides, it will cause infinite loop
     * so you should only put cascade on one side
     * usually put cascade on the oneToMany side
     * example if use cascade:true so  you can understand that do save with feed user will be performed
     * otherwise if use onUpdate:'CASCADE' or onDelete:'CASCADE' so you can understand that do update or delete with user so feed will be performed
     * 
     * cascade in typeorm level
     * and onUpdate:'CASCADE' or onDelete:'CASCADE' in db level (only many side which has foreign key)
     * two things are different
     * 
     * if cascade:true, you use delete at user repository, feed will not be deleted because it requires to load feed first then delete, 
     * you have to use remove method instead of delete method instead or use onDelete:'CASCADE' in db level at feed entity(many side which has foreign key)
     */
    @PrimaryGeneratedColumn()
    id: number


    @Column({
        length: 255
    })
    feed_Name: string


    @ManyToOne(() => User, user => user.feeds, {
        //  cascade: true
        onDelete: 'CASCADE' // khi xóa user thì xóa feed (cascade delete in db level)

    })
    user: User


}