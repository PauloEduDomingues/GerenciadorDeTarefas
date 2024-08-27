import { DataSource, DataSourceOptions } from "typeorm"

const options: DataSourceOptions = {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: ["./src/database/models/**.ts"],
    migrations: ["./src/database/migrations/**.ts"],
    subscribers: [],
}

export const AppDataSource = new DataSource(options)
