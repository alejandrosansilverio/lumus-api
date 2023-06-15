import { DataSource } from "typeorm";
import { UsuarioEntity } from "./entities/usuario.entity";
import { NivelAcessoEntity } from "./entities/nivel-acesso.entity";


export const usuarioProviders = [
    {
        provide: 'USUARIO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UsuarioEntity),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'NIVEL_ACESSO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NivelAcessoEntity),
        inject: ['DATA_SOURCE']
    }
]