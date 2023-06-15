import { DataSource } from "typeorm";
import { PostagemEntity } from "./entities/postagem.entity";
import { PostagemCategoriaEntity } from "./entities/postagem-categoria.entity";


export const postagemProviders = [
    {
        provide: 'POSTAGEM_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PostagemEntity),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'POSTAGEM_CATEGORIA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PostagemCategoriaEntity),
        inject: ['DATA_SOURCE']
    }
]