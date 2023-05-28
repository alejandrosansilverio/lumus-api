import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { FiltrosListarUsuarios } from './dto/find-options-listagem.dto';

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
}
