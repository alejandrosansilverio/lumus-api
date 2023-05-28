import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriaEntity } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { FiltrosListarCategorias } from './dto/find-options-listagem.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @Inject('CATEGORIA_REPOSITORY')
        private categoriaRepository: Repository<CategoriaEntity>
    ) { }

    async findAll(findOptions?: FiltrosListarCategorias) {
        let qb = this.categoriaRepository.createQueryBuilder('c')
            .where("c.desativadoEm is null")

        if (findOptions && findOptions.nome) {
            qb.andWhere("c.nome ilike :nome", { nome: findOptions.nome })
        }

        return await qb.getMany().catch(err => {
            throw new InternalServerErrorException(`Não foi possivel listar as categorias.`)
        });
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
