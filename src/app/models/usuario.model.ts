
export class Usuario {
    id: number;
    nome?: string;
    email?: string;
    tipoUsuario?: string;
    login?: string;
    senha?: string;
    confirmaSenha?: string;
    codigoResetSenha?: string;
    revisor = function():boolean {
       return this.tipoUsuario == 'Revisor';
    }
}