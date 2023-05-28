import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { FiltrosListarUsuarios } from './dto/find-options-listagem.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async findOneForFailById(id: number): Promise<UsuarioEntity> {
        return await this.usuarioRepository.findOneOrFail({ where: { id } }).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel encontrar o usuario com o id ${id}.`)
        });
    }

    async findAll(findOptions?: FiltrosListarUsuarios) {
        let qb = this.usuarioRepository.createQueryBuilder('u')
            .where("u.desativadoEm is null")

        if (findOptions && findOptions.nome) {
            qb.andWhere("u.nome ilike :nome", { nome: findOptions.nome })
        }

        return await qb.getMany().catch(err => {
            throw new InternalServerErrorException(`Não foi possivel listar os usuarios.`)
        });
    }
}
