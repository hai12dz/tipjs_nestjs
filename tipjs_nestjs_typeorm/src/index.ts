import { AppDataSource } from "./data-source"
import { CCCD } from "./entity/CCCD"
import { Feed } from "./entity/Feed";
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

    // const cccd1 = await AppDataSource.manager.find(CCCD, { relations: ["user"] });
    // console.log(cccd1);
    // const cccd2 = await AppDataSource.manager.getRepository(CCCD).
    //     createQueryBuilder("cccd").
    //     leftJoinAndSelect("cccd.user", "user").
    //     getMany();
    // console.log(cccd2);

    // ...existing code...
    // const u = new User();
    // u.name = "Nguyen Van B";

    // const f1 = new Feed();
    // f1.feed_Name = "Feed 1";

    // const f2 = new Feed();
    // f2.feed_Name = "Feed 2";

    // const f3 = new Feed();
    // f3.feed_Name = "Feed 33";

    // // liên kết ở phía con (không bắt buộc nếu đã gán mảng ở phía cha, nhưng nên đồng bộ)
    // f1.user = u;
    // f2.user = u;
    // f3.user = u;

    // // gán mảng feeds để cascade hoạt động
    // u.feeds = [f1, f2, f3];

    // await AppDataSource.manager.save(u);
    // console.log("User + feeds saved (cascade insert)");
    // ...existing code...


    // const users = await AppDataSource.manager.find(User, { relations: ["feeds"] });
    // console.log(users);
    // console.log('feed => ', users.map(u => u.feeds));

    // const users = await AppDataSource.manager.getRepository(User).
    //     createQueryBuilder("user").
    //     leftJoinAndSelect("user.feeds", "feed").
    //     getMany();
    // console.log(users);
    // console.log('feed => ', users.map(u => u.feeds));

    //delete user 
    await AppDataSource.manager.delete(User, 28);
    console.log("User deleted (cascade delete in db level)");
}).catch(error => console.log(error))
