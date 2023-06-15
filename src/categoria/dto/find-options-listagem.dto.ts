export enum Ordem {
    Ascendente = 'ASC',
    Descendente = 'DESC',
}

export enum OrdenarPor {
    Nome = 'nome',
}

export class FiltrosListarCategorias {
    nome?: string;

    limite?: number;

    offset?: number;

    ordenarPor?: OrdenarPor;

    ordem?: Ordem;

}

