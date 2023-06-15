import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'postagem_categoria', schema: process.env.SCHEMA })
export class PostagemCategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'postagem_id' })
    postagemId: number;

    @Column({ name: 'categoria_id' })
    categoriaId: number;

    constructor(partial: Partial<PostagemCategoriaEntity>) {
        Object.assign(this, partial);
    }
}