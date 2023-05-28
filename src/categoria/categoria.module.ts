import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { categoriaProviders } from './categoria.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriaController],
    providers: [
        ...categoriaProviders,
        CategoriaService
    ]
})
export class CategoriaModule { }
