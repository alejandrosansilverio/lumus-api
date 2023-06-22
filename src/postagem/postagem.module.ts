import { Module } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { postagemProviders } from './postagem';
import { DatabaseModule } from 'src/database/database.module';
import { PostagemController } from './postagem.controller';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [DatabaseModule, CategoriaModule],
  controllers: [PostagemController],
  providers: [
    ...postagemProviders,
    PostagemService
  ]
})
export class PostagemModule { }
