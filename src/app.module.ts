import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CategoriaModule, DatabaseModule]
})
export class AppModule { }
