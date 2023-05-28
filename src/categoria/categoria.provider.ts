import { DataSource } from "typeorm";
import { CategoriaEntity } from "./categoria.entity";


export const categoriaProviders = [
    {
        provide: 'CATEGORIA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoriaEntity),
        inject: ['DATA_SOURCE']
    }
]