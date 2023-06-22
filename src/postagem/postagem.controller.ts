import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Inject, Put } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostagemEntity } from './entities/postagem.entity';
import { PostagemService } from './postagem.service';
import { FiltrosListarPostagens } from './dto/find-options-listagem.dto';
import { Mensagem } from 'src/class/mensagem.class';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdatePostagemDto } from './dto/update-postagem.dto';

@ApiTags('Postagem')
@Controller('postagem')
export class PostagemController {

    constructor(
        private postagemService: PostagemService,
    ) { }


    @Get()
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: [PostagemEntity] })
    @ApiNotFoundResponse({ description: 'Postagens não foram encontradas.' })
    @ApiOperation({
        summary: 'Retornar as Postagens.',
        description: 'Retorna as Postagens.',
    })
    async findAll(
        @Query() filtroListagem?: FiltrosListarPostagens
    ): Promise<{ dados: PostagemEntity[], total: number }> {
        return await this.postagemService.findAll(filtroListagem)
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: PostagemEntity })
    @ApiNotFoundResponse({ description: 'Postagem não encontrada.' })
    @ApiOperation({
        summary: 'Retornar a postagem',
        description: 'Retorna a postagem com base no seu id.',
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<PostagemEntity> {
        return await this.postagemService.findOneForFailById(id)
    }

    @Post()
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao incluir Postagem. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Insere uma nova postagem',
        description:
            'Insere uma nova postagem no sistema.',
    })
    async create(
        @Body() createPostagemDto: CreatePostagemDto,
    ): Promise<Mensagem> {
        await this.postagemService.create(createPostagemDto);

        return new Mensagem('Postagem criado com sucesso');
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao atualizar a Postagem. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Atualiza uma postagem',
        description:
            'Atualiza os dados de uma postagem informando seu id.',
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updatePostagemDto: UpdatePostagemDto
    ): Promise<Mensagem> {
        if (updatePostagemDto.autorId || updatePostagemDto.categoriaIds && updatePostagemDto.categoriaIds.length > 0 || updatePostagemDto.titulo || updatePostagemDto.introducao || updatePostagemDto.texto) {
            await this.postagemService.update(id, updatePostagemDto);
        }
        return new Mensagem('Postagem atualizada com sucesso');
    }

}
