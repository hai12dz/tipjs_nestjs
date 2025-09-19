import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    //insert
    // await AppDataSource.manager.save(User, [
    //     { firstName: 'Timber', lastName: 'Saw', age: 25 },
    //     { firstName: 'Ming', lastName: 'Shen', age: 30 },
    //     { firstName: 'Jack', lastName: 'Ma', age: 55 },
    // ])

    //delete
    await AppDataSource.manager.delete(User, [7, 8])

    //remove
    const u = new User()
    u.id = 6
    await AppDataSource.manager.remove(User, u)

    //find
    const users = await AppDataSource.manager.find(User)
    console.log(users)

    const user = await AppDataSource.manager.findBy(User, { id: 4 })
    console.log(user)

    const user2 = await AppDataSource.manager.findOneBy(User, { id: 5 })
    console.log(user2)

    const [user3, count] = await AppDataSource.manager.findAndCount(User)
    console.log(user3, count)

    const user4 = await AppDataSource.manager.findOne(User,
        {
            where: { id: 4 },
            order: { id: 'ASC' },
            select: { firstName: true, age: false },
        }
    )
    console.log(user4)

    const user5 = await AppDataSource.manager.findOneOrFail(User, { where: { id: 4 } })
    console.log(user5)

    const user6 = await AppDataSource.manager.query('select * from user where id = ?', [4])
    console.log(user6)

    const queryBuilder = await AppDataSource.manager.createQueryBuilder()
    const user7 = await queryBuilder
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id: 9 })
        .getOne()
    console.log(user7)

    await AppDataSource.manager.transaction(async (t) => {
        await t.save(User, { firstName: 'A', lastName: 'B', age: 10 })
    })
    //conclusion
    /**
     * find and findOne similar
     * findBy and findOneBy similar
     * when use relation in find and findOne, it will be left join and select 
     * can use select to choose fields want to show of entity main, but not relation entity
     * findBy and findOneBy only use where
     */

}).catch(error => console.log(error))
