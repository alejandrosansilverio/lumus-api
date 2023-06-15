import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                // url:'postgressql://postgres:R3Z7m7uIIe2LbAlGMFVN@containers-us-west-144.railway.app',
                host: "containers-us-west-144.railway.app",
                port: 7043,
                username: "postgres",
                password: "R3Z7m7uIIe2LbAlGMFVN",
                database: "railway",
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: true
            });

            return dataSource.initialize();
        }
    }
]