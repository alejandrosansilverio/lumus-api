import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { FiltrosListarUsuarios } from './dto/find-options-listagem.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Mensagem } from 'src/class/mensagem.class';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuario')
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
    ): Promise<{dados: UsuarioEntity[], total: number}> {
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

    @Put(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao atualizar o usuário. Contate o administrador do sistema.',
    })
    @ApiOperation({
        summary: 'Atualiza um usuário',
        description:
            'Atualiza os dados de um usuário informando seu id.',
    })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateUsuarioDto: UpdateUsuarioDto
    ): Promise<Mensagem> {
        if (updateUsuarioDto.nome || updateUsuarioDto.email || updateUsuarioDto.nome || updateUsuarioDto.senha || updateUsuarioDto.nivelAcessoId) {
            await this.usuarioService.update(id, updateUsuarioDto);
        }
        return new Mensagem('Usuario atualizado com sucesso.');
    }

    @Delete(':id/')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: Mensagem })
    @ApiOperation({
        summary: 'Apaga um usuario.',
        description:
            'Apaga usuario pelo id.',
    })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<Mensagem> {

        await this.usuarioService.delete(id);

        return new Mensagem('O usuario foi excluído com sucesso.');
    }
}
