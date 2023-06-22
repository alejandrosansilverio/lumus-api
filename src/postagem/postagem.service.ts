import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostagemEntity } from './entities/postagem.entity';
import { FiltrosListarPostagens, Ordem } from './dto/find-options-listagem.dto';

@Injectable()
export class PostagemService {

    constructor(
        @Inject('POSTAGEM_REPOSITORY')
        private postagemRepository: Repository<PostagemEntity>
    ) { }

    async findAll(findOptions?: FiltrosListarPostagens) {
        let qb = this.postagemRepository.createQueryBuilder('p')
            .leftJoinAndSelect('p.postagemCategorias', 'pc')
            .leftJoinAndSelect('pc.categoria', 'c')
            .where("p.desativadoEm is null")

        if (findOptions && findOptions.titulo) {
            qb.andWhere("p.nome ilike :titulo", { titulo: findOptions.titulo })
        }

        if (findOptions?.categoriaIds && findOptions.categoriaIds.length > 0) {
            qb.andWhere("p.categoriaId = ANY(:categoriaIds)", { categoriaIds: findOptions.categoriaIds })
        }

        const count = await qb.getCount()

        if (findOptions.limite) {
            qb.limit(findOptions.limite);
            qb.offset(Number(findOptions.offset) > 0 ? findOptions.offset : 0);
        }

        const order = findOptions.ordem ? (findOptions.ordem === Ordem.Ascendente ? 'ASC' : 'DESC') : 'ASC';

        if ('titulo' === findOptions.ordenarPor) {
            qb.orderBy(`${qb.alias}.titulo`, order);
        }

        return {
            dados: await qb.getMany().catch(err => {
                throw new InternalServerErrorException(`Não foi possivel listar as categorias.`)
            }),
            total: count
        }
    }

    async findOneForFailById(id: number): Promise<PostagemEntity> {
        return await this.postagemRepository.findOneOrFail({
            relations:['postagemCategorias', 'postagemCategorias.categoria'],
            where: { id }
        }).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel encontrar o usuario com o id ${id}.`)
        });
    }

}
