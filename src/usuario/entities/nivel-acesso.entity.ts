import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'nivel-acesso', schema: process.env.SCHEMA })
export class NivelAcessoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao?: string;

    @Column({ name: 'criado_em', nullable: true })
    criadoEm?: Date;

    constructor(partial: Partial<NivelAcessoEntity>) {
        Object.assign(this, partial);
    }
}