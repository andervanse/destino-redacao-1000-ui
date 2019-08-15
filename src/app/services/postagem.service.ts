import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Postagem } from '../models/postagem.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  postagens :Postagem[];

  constructor(private http: HttpClient) {
    this.postagens = [];
  }

  obterPostagens(categoria :string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.apiBaseUrl}/api/postagem/${categoria}`)
    .pipe(
        map((response) => {
            this.postagens = response;
            return this.postagens;
        })
    ); 
  }

  obterPostagem(id :number): Observable<Postagem> {
    return of(this.postagens? this.postagens.find(p => p.id == id) : null); 
  }  

  uploadImagemPostagem(file: any) {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/postagem/imagem`, file)
      .pipe(
          map((response) => {
            return response;
          })
      );
  }  

  salvarPostagem(formData: FormData): Observable<any> {
    let postagem = new Postagem();
    postagem.id = +formData.get('id').toString();
    postagem.titulo = formData.get('titulo').toString();
    postagem.texto = formData.get('texto').toString();
    postagem.urlImagem = formData.get('urlImagem').toString();
    this.postagens.push(postagem);

    return this.http.post<any>(`${environment.apiBaseUrl}/api/postagem`, formData)
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
    
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/postagem/${postagem.id}`, httpOptions)
    .pipe(
        map((response) => {
          let idx = this.postagens.findIndex(p => p.id == postagem.id);
          this.postagens.splice(idx, 1);  
          return response;
        })
    ); 
  }
  
}
