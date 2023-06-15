import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(partial: Partial<PostagemEntity>) {
        Object.assign(this, partial);
    }
}