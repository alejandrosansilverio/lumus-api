import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostagemEntity } from "./postagem.entity";
import { CategoriaEntity } from "src/categoria/categoria.entity";

@Entity({ name: 'postagem_categoria', schema: process.env.SCHEMA })
export class PostagemCategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'postagem_id' })
    postagemId: number;

    @Column({ name: 'categoria_id' })
    categoriaId: number;

    @ManyToOne(() => PostagemEntity)
    @JoinColumn({ name: 'postagem_id' })
    postagem: PostagemEntity;

    @ManyToOne(() => CategoriaEntity)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaEntity;

    constructor(partial: Partial<PostagemCategoriaEntity>) {
        Object.assign(this, partial);
    }
}