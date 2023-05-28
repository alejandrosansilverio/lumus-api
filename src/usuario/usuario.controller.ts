import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { FiltrosListarUsuarios } from './dto/find-options-listagem.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Mensagem } from 'src/class/mensagem.class';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) { }

    @Get(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: UsuarioEntity })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    @ApiOperation({
        summary: 'Retornar o usuario',
        description: 'Retorna o usuario com base no seu id.',
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<UsuarioEntity> {
        return await this.usuarioService.findOneForFailById(id)
    }

    @Get()
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: [UsuarioEntity] })
    @ApiNotFoundResponse({ description: 'Usuarios não foram encontrados.' })
    @ApiOperation({
        summary: 'Retornar os Usuarios.',
        description: 'Retorna os usuarios.',
    })
    async findAll(
        @Query() filtroListagem?: FiltrosListarUsuarios
    ): Promise<UsuarioEntity[]> {
        return await this.usuarioService.findAll(filtroListagem)
    }

    @Post()
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao incluir Usuario. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Cria um novo usuario',
        description:
            'Cria um novo usuario no sistema.',
    })
    async create(
        @Body() createUsuarioDto: CreateUsuarioDto,
    ): Promise<Mensagem> {
        await this.usuarioService.create(createUsuarioDto);
        return new Mensagem('Usuário criado com sucesso');
    }
}
