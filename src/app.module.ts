import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PostagemController } from './postagem/postagem.controller';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [CategoriaModule, DatabaseModule, UsuarioModule, PostagemModule],
})
export class AppModule { }
