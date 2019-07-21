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
          return resp;
        })
      );
  }   

}