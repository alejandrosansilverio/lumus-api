import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';

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
}
