import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categoria', schema: process.env.SCHEMA })
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({ name: 'criado_em', nullable: true })
    criadoEm?: Date;

    @Column({ name: 'atualizado_em', nullable: true })
    atualizadoEm?: Date;

    @Column({ name: 'desativado_em', nullable: true })
    desativadoEm?: Date;

    constructor(partial: Partial<CategoriaEntity>) {
        Object.assign(this, partial);
    }
}