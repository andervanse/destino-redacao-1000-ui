import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revisao } from '../models/revisao.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AtualizaRevisao } from '../models/atualiza-revisao.model';

@Injectable({
  providedIn: 'root'
})
export class RevisaoAssinanteService {

  private revisaoUploadCorrecao :Revisao;

  private revisoes :Revisao[];

  constructor(private http: HttpClient) { }

  obterRevisoes(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao`)
    .pipe(
        map((response) => {
            this.revisoes = response;
            return response;
        })
    ); 
  }

  atualizarRevisaoUploadCorrecao(revisao :Revisao) {
    this.revisaoUploadCorrecao = revisao;
  }

  obterRevisaoUploadCorrecao(): Revisao {
    return this.revisaoUploadCorrecao;
  }

  obterRevisoesPendentes(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao/pendentes`)
    .pipe(
        map((response) => {  
          this.revisoes = response;        
          return this.revisoes;
        })
    ); 
  } 

  obterRevisoesFinalizadas(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao/finalizadas`)
    .pipe(
        map((response) => {  
          this.revisoes = response;        
          return this.revisoes;
        })
    ); 
  }   
  
  obterRevisoesNovas(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao/novas`)
    .pipe(
        map((response) => {
          this.revisoes = response;        
          return this.revisoes;
        })
    ); 
  }   

  uploadArquivoRevisao(file:any) {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/revisao`, file)
      .pipe(
          map((response) => {
            return response;
          })
      );
  }

  atualizarRevisor(atualizaRevisao :AtualizaRevisao) {
    return this.http.patch<any>(`${environment.apiBaseUrl}/api/revisao`, atualizaRevisao)
      .pipe(
          map((response) => {            
            return response;
          })
      );
  }

  excluirRevisao(deletaRevisao :Revisao) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: deletaRevisao
    };
    
    var revisaoIdx = this.revisoes.findIndex(r => r.id == deletaRevisao.id);
    this.revisoes.splice(revisaoIdx, 1);

    return this.http.delete<any>(`${environment.apiBaseUrl}/api/revisao/${deletaRevisao.arquivo.nome}`, httpOptions)
      .pipe(
          map((response) => {
             return response;
          })
      );
  }
}
