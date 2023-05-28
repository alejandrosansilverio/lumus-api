import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 3011,
                username: 'postgres',
                password: 'postgres',
                database: 'lumus',
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: true
            });

            return dataSource.initialize();
        }
    }
]