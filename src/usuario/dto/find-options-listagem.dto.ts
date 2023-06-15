import { SelectQueryBuilder } from "typeorm";
import { UsuarioEntity } from "../entities/usuario.entity";

export enum Ordem {
    Ascendente = 'ASC',
    Descendente = 'DESC',
}

export enum OrdenarPor {
    Nome = 'nome',
}

export class FiltrosListarUsuarios {

    nome?: string;

    limite?: number;

    offset?: number;

    ordenarPor?: OrdenarPor;

    ordem?: Ordem;

}



