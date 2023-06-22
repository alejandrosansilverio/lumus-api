import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostagemEntity } from './entities/postagem.entity';
import { PostagemService } from './postagem.service';
import { FiltrosListarPostagens } from './dto/find-options-listagem.dto';

@ApiTags('Postagem')
@Controller('postagem')
export class PostagemController {

    constructor(
        private postagemService: PostagemService
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

}
