import { AppDataSource } from "./data-source"
import { CCCD } from "./entity/CCCD"
import { Feed } from "./entity/Feed";
import { Post } from "./entity/Post";
import { Tag } from "./entity/Tag";
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    //save
    // const p1 = new Post();
    // p1.title = "post 1";

    // const p2 = new Post();
    // p2.title = "post 2";

    // const p3 = new Post();
    // p3.title = "post 3";

    // const t1 = new Tag();
    // t1.name = "tag 1";

    // const t2 = new Tag();
    // t2.name = "tag 2";

    // const t3 = new Tag();
    // t3.name = "tag 3";

    // p1.tags = [t1, t2];
    // p2.tags = [t2, t3];
    // p3.tags = [t1, t3];

    const entityManager = AppDataSource.manager;
    // await entityManager.save([t1, t2, t3]);
    // await entityManager.save([p1, p2, p3]);
    //update
    // const postToupdate = await AppDataSource.manager.findOne(Post, {
    //     where: { id: 1 },
    //     relations: { tags: true }
    // });
    // if (postToupdate) {
    //     postToupdate.title = "post 1 updated";
    //     postToupdate.tags = postToupdate.tags.filter(t => t.name.includes("tag"));
    //     await AppDataSource.manager.save(postToupdate);
    // }

    // console.log(postToupdate, "------------------", postToupdate.tags);

    // const posts = await AppDataSource.manager.find(Post, { relations: { tags: true } });
    // console.log(posts, "------------------", posts.map(p => p.tags));


    //delete
    // await entityManager.delete(Post, { id: 1 });
    // console.log("Deleted post with id 1");





}).catch(error => console.log(error))
