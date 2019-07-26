import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revisao } from '../models/revisao.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AtualizaRevisao } from '../models/atualiza-revisao.model';

@Injectable({
  providedIn: 'root'
})
export class RevisaoAssinanteService {

  constructor(private http: HttpClient) { }

  obterRevisoes(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao`)
    .pipe(
        map((resp) => {
            return resp;
        })
    ); 
  }

  obterRevisoesPendentes(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao/pendentes`)
    .pipe(
        map((resp) => {
           return resp;
        })
    ); 
  } 
  
  obterRevisoesNovas(): Observable<Revisao[]> {

    return this.http.get<Revisao[]>(`${environment.apiBaseUrl}/api/revisao/novas`)
    .pipe(
        map((resp) => {
           return resp;
        })
    ); 
  }   

  uploadArquivoRevisao(file:any) {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/revisao`, file)
      .pipe(
          map((resp) => {
             return resp;
          })
      );
  }

  atualizarRevisor(atualizaRevisao :AtualizaRevisao) {
    return this.http.patch<any>(`${environment.apiBaseUrl}/api/revisao`, atualizaRevisao)
      .pipe(
          map((resp) => {
             return resp;
          })
      );
  }
}
