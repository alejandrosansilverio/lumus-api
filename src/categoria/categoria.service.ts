import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { CategoriaEntity } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { FiltrosListarCategorias, Ordem } from './dto/find-options-listagem.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @Inject('CATEGORIA_REPOSITORY')
        private categoriaRepository: Repository<CategoriaEntity>
    ) { }

    async findAll(findOptions?: FiltrosListarCategorias) {
        let qb = this.categoriaRepository.createQueryBuilder('c')
            .where("c.desativadoEm is null")

        if (findOptions) {
            if (findOptions.nome) qb.andWhere("c.nome ilike :nome", { nome: findOptions.nome });

            if (findOptions.ids && findOptions.ids.length > 0) qb.andWhere("c.id = ANY(:ids)", { ids: findOptions.ids });
        }

        const count = await qb.getCount()

        if (findOptions.limite) {
            qb.limit(findOptions.limite);
            qb.offset(Number(findOptions.offset) > 0 ? findOptions.offset : 0);
        }

        const order = findOptions.ordem ? (findOptions.ordem === Ordem.Ascendente ? 'ASC' : 'DESC') : 'ASC';

        if ('nome' === findOptions.ordenarPor) {
            qb.orderBy(`${qb.alias}.nome`, order);
        }

        return {
            dados: await qb.getMany().catch(err => {
                throw new InternalServerErrorException(`Não foi possivel listar as categorias.`)
            }),
            total: count
        }
    }

    async findOneForFailById(id: number): Promise<CategoriaEntity> {
        return await this.categoriaRepository.findOneOrFail({ where: { id } }).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel encontrar a categoria com o id ${id}.`)
        });
    }

    async create(dto: CreateCategoriaDto): Promise<CategoriaEntity> {
        return await this.categoriaRepository.save(new CategoriaEntity({ ...dto })).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel cadastrar a categoria.`)
        });
    }

    async update(id: number, dto: UpdateCategoriaDto): Promise<UpdateResult> {

        await this.findOneForFailById(id)

        return await this.categoriaRepository.update({ id }, new CategoriaEntity({ ...dto, atualizadoEm: new Date() })).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel atualizar a categoria.`)
        });
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findOneForFailById(id);

        return this.categoriaRepository.delete({ id }).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel deletar a categoria.`)
        });
    }

}
