import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostagemCategoriaEntity } from './entities/postagem-categoria.entity';
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
    @ApiOkResponse({ description: 'Serviço executado com sucesso', type: [PostagemCategoriaEntity] })
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

}
