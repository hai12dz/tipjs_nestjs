import { AppDataSource } from "./data-source"
import { CCCD } from "./entity/CCCD"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // const user = new User()
    // user.firstName = "John"
    // user.lastName = "Doe"
    // user.age = 25

    // await AppDataSource.manager.save(user)
    // console.log("User has been saved")

    // //cccd 
    // const cccd = new CCCD();
    // cccd.cccd_no = "123456789012";
    // cccd.user = user;

    // await AppDataSource.manager.save(cccd);
    // console.log("CCCD has been saved");

    // await AppDataSource.manager.delete(User, 17);

    const cccd1 = await AppDataSource.manager.find(CCCD, { relations: ["user"] });
    console.log(cccd1);
    const cccd2 = await AppDataSource.manager.getRepository(CCCD).
        createQueryBuilder("cccd").
        leftJoinAndSelect("cccd.user", "user").
        getMany();
    console.log(cccd2);


}).catch(error => console.log(error))
