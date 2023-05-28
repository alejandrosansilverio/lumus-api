import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CategoriaModule, DatabaseModule, UsuarioModule]
})
export class AppModule { }
