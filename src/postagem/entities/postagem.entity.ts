import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostagemCategoriaEntity } from "./postagem-categoria.entity";

@Entity({ name: 'postagem', schema: process.env.SCHEMA })
export class PostagemEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ name: 'autor_id' })
    autorId: number;

    @Column()
    introducao: string;

    @Column()
    texto: string;

    @Column({ name: 'quantidade_visualizacoes' })
    qtdVisualizacoes: number;

    @Column({ name: 'criado_em', nullable: true })
    criadoEm?: Date;

    @Column({ name: 'atualizado_em', nullable: true })
    atualizadoEm?: Date;

    @Column({ name: 'desativado_em', nullable: true })
    desativadoEm?: Date;

    @OneToMany(
        type => PostagemCategoriaEntity,
        postagemCategoria => postagemCategoria.postagem,
    )
    postagemCategorias: PostagemCategoriaEntity[]

    constructor(partial: Partial<PostagemEntity>) {
        Object.assign(this, partial);
    }
}