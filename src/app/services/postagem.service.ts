import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Postagem } from '../models/postagem.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  obterPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.apiBaseUrl}/api/postagem`)
    .pipe(
        map((response) => {
            return response;
        })
    ); 
  }

  uploadImagemPostagem(file: any) {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/postagem/imagem`, file)
      .pipe(
          map((response) => {
            return response;
          })
      );
  }  

  salvarPostagem(postagem: Postagem): Observable<any> {

    return this.http.post<any>(`${environment.apiBaseUrl}/api/postagem`, postagem)
    .pipe(
        map((response) => {
            return response;
        })
    ); 
  }  

  excluirPostagem(postagem: Postagem): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: postagem
    };
    
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/postagem`, httpOptions)
    .pipe(
        map((response) => {
            return response;
        })
    ); 
  }
  
}
