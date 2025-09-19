import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Xxx } from "./entity/Xxx"
import { CCCD } from "./entity/CCCD"
import { Feed } from "./entity/Feed"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Taolahai1762004@",
    database: "haidao_nestjs_typeorm_tipjs",
    synchronize: true,
    logging: false,
    entities: [User, Xxx, CCCD, Feed],
    migrations: [],
    subscribers: [],
})
