export class Revisao {
    id: number;
    assinanteId: number;
    assinanteEmail: string;
    revisorId: number;
    comentario: string;
    arquivo: Arquivo;
    statusRevisao: string;
    tipoArquivo: string;
    dataPrevista: Date;
}

export class Arquivo {
    nome: string;
    url: string;
    dataAtualizacao: Date;
}