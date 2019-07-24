export class Revisao {
    id: number;
    assinanteId: number;
    revisorId: number;
    comentario: string;
    arquivo: Arquivo;
    statusRevisao: string;
    dataPrevista: Date;
}

export class Arquivo {
    nome: string;
    url: string;
    dataAtualizacao: Date;
}