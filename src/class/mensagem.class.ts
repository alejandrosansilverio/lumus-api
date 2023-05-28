import { ApiResponseProperty } from '@nestjs/swagger';

export class Mensagem {
    // @ApiResponseProperty()
    readonly mensagem?: string;

    constructor(mensagem: string) {
        this.mensagem = mensagem;
    }
}