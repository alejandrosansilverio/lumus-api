import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from './categoria.entity';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Mensagem } from '../class/mensagem.class'
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { FiltrosListarCategorias } from './dto/find-options-listagem.dto';

@ApiTags('Categoria')
@Controller('categoria')
export class CategoriaController {

    constructor(
        private categoriaService: CategoriaService
    ) { }

    @Get()
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: [CategoriaEntity] })
    @ApiNotFoundResponse({ description: 'Categorias não foram encontradas.' })
    @ApiOperation({
        summary: 'Retornar as Categorias.',
        description: 'Retorna as categorias.',
    })
    async findAll(
        @Query() filtroListagem?: FiltrosListarCategorias
    ): Promise<CategoriaEntity[]> {
        return await this.categoriaService.findAll(filtroListagem)
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: CategoriaEntity })
    @ApiNotFoundResponse({ description: 'Categoria não encontrada.' })
    @ApiOperation({
        summary: 'Retornar a categoria',
        description: 'Retorna a categoria com base no seu id.',
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<CategoriaEntity> {
        return await this.categoriaService.findOneForFailById(id)
    }

    @Post()
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao incluir Categoria. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Cria uma nova categoria',
        description:
            'Cria uma nova categoria no sistema.',
    })
    async create(
        @Body() createCategoriaDto: CreateCategoriaDto,
    ): Promise<Mensagem> {
        await this.categoriaService.create(createCategoriaDto);
        return new Mensagem('Categoria criada com sucesso');
    }

    @Post(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao incluir Categoria. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Atualiza uma categoria',
        description:
            'Atualiza os dados de uma categoria informando seu id.',
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateCategoriaDto: UpdateCategoriaDto
    ): Promise<Mensagem> {
        if (updateCategoriaDto.nome || updateCategoriaDto.descricao) {
            await this.categoriaService.update(id, updateCategoriaDto);
        }
        return new Mensagem('Categoria atualizada com sucesso');
    }

    @Delete(':id/')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: Mensagem })
    @ApiOperation({
        summary: 'Apaga uma categoria.',
        description:
            'Apaga categoria pelo id.',
    })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<Mensagem> {

        await this.categoriaService.delete(id);

        return new Mensagem('O categoria foi excluída com sucesso.');
    }

}
