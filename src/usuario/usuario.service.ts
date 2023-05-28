import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsuarioEntity } from './entities/usuario.entity';
import { ILike, IsNull, Like, Repository } from 'typeorm';
import { FiltrosListarUsuarios } from './dto/find-options-listagem.dto';
import { NivelAcessoEntity } from './entities/nivel-acesso.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<UsuarioEntity>,
        @Inject('NIVEL_ACESSO')
        private nivelAcessoRepository: Repository<NivelAcessoEntity>
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

    async create(dto: CreateUsuarioDto): Promise<UsuarioEntity> {

        await this.validacaoCreate(dto);

        return await this.usuarioRepository.save(new UsuarioEntity({ ...dto })).catch(err => {
            throw new InternalServerErrorException(`Não foi possivel cadastrar a categoria.`)
        });
    }

    async validacaoCreate(dto: CreateUsuarioDto) {

        await Promise.all([
            //verifica se existe nivel de acesso informado
            this.nivelAcessoRepository.findOneByOrFail({ id: dto.nivelAcessoId }).catch(err => {
                throw new InternalServerErrorException(`Nivel de acesso não foi encontrado.`)
            }),
            //valida email
            this.usuarioRepository.findOne({ where: { email: Like(dto.email), desativadoEm: IsNull() } }).then((u) => {
                if (u) throw new InternalServerErrorException(`O email informado ja está cadastrado no sistema. Entre com um novo.`)
            })
        ])

    }
}
