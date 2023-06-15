export enum Ordem {
    Ascendente = 'ASC',
    Descendente = 'DESC',
}

export enum OrdenarPor {
    Titulo = 'titulo',
}

export class FiltrosListarPostagens {
    titulo?: string;

    categoriaIds?: number[];

    limite?: number;

    offset?: number;

    ordenarPor?: OrdenarPor;

    ordem?: Ordem;

}

