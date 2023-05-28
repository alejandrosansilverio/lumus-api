import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) { }

    @Get(':id')
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: UsuarioEntity })
    @ApiNotFoundResponse({ description: 'Usuário não encontrada.' })
    @ApiOperation({
        summary: 'Retornar o usuario',
        description: 'Retorna o usuario com base no seu id.',
    })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<UsuarioEntity> {
        return await this.usuarioService.findOneForFailById(id)
    }
}
