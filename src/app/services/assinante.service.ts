import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AssinanteService {

  private assinanteCadastrado :Usuario;
  assi: Usuario;

  constructor(private http: HttpClient) { }

  obterAssinante(nome :string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiBaseUrl}/api/usuario/${nome}`)
    .pipe(
        map((resp) => {
            return resp;
        })
    );        
  }

  obterInfoAssinante(id :number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiBaseUrl}/api/usuario/${id}`)
    .pipe(
        map((resp) => {
            return resp;
        })
    );        
  }  

  salvar(assinante: Usuario): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/usuario`, assinante)
      .pipe(
        map((resp) => {
          this.assinanteCadastrado = assinante;
          return resp;
        })
      );
  }

  confirmarEmail(email :string, codigo :string): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/email/${email}`, { email: email, codigo: codigo })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }  

  redefinirSenha(email: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiBaseUrl}/api/usuario/senha`, { email: email })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }   

  definirNovaSenha(assinante: Usuario): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/usuario/senha`, assinante)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }  
  
  getAssinanteCadastrado(): Usuario {   
    return this.assinanteCadastrado;
  }

}