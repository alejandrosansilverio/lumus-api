import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario', schema: process.env.SCHEMA })
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column({ name: 'criado_em', nullable: true })
    criadoEm?: Date;

    @Column({ name: 'atualizado_em', nullable: true })
    atualizadoEm?: Date;

    @Column({ name: 'desativado_em', nullable: true })
    desativadoEm?: Date;

    constructor(partial: Partial<UsuarioEntity>) {
        Object.assign(this, partial);
    }
}