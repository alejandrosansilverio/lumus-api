import { Module } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { postagemProviders } from './postagem';
import { DatabaseModule } from 'src/database/database.module';
import { PostagemController } from './postagem.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PostagemController],
  providers: [
    ...postagemProviders,
    PostagemService
  ]
})
export class PostagemModule { }
