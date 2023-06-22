import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { PostagemEntity } from './entities/postagem.entity';
import { FiltrosListarPostagens, Ordem } from './dto/find-options-listagem.dto';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { CategoriaService } from 'src/categoria/categoria.service';
import { PostagemCategoriaEntity } from './entities/postagem-categoria.entity';
@Injectable()
export class PostagemService {

    constructor(
        @Inject('POSTAGEM_REPOSITORY')
        private postagemRepository: Repository<PostagemEntity>,
        @Inject('POSTAGEM_CATEGORIA_REPOSITORY')
        private postagemCategoriaRepository: Repository<PostagemCategoriaEntity>,
        private categoriaService: CategoriaService,
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
            relations: ['postagemCategorias', 'postagemCategorias.categoria'],
            where: { id }
        }).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel encontrar o usuario com o id ${id}.`)
        });
    }

    async create(dto: CreatePostagemDto, entityManager?: EntityManager): Promise<PostagemEntity> {

        await this.validacaoCreate(dto);

        const postagem = await this.postagemRepository.save(new PostagemEntity({ ...dto, qtdVisualizacoes: 0 })).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel cadastrar a postagem.`)
        });

        await this.createManyPostagemCategoria(postagem.id, dto.categoriaIds)

        return postagem;
    }

    async validacaoCreate(dto: CreatePostagemDto) {
        //verifica se as categorias existem
        const categorias = await this.categoriaService.findAll({
            ids: dto.categoriaIds
        })

        if (categorias.total != dto.categoriaIds.length) throw new InternalServerErrorException("Não foi possível buscar as categorias informadas.")
    }

    async createManyPostagemCategoria(postagemId: number, categoriaIds: number[], entityManager?: EntityManager) {
        const postagemCategorias = categoriaIds.map((id) => new PostagemCategoriaEntity({ postagemId: postagemId, categoriaId: id }))
        return await this.postagemCategoriaRepository.save(postagemCategorias);
    }

}
