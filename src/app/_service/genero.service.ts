import { Genero } from './../_model/genero';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  
  generoCambio = new Subject<Genero[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/generos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Genero[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Genero>(`${this.url}/${id}`);
  }

  registrar(genero: Genero) {
    return this.http.post(this.url, genero);
  }

  modificar(genero: Genero) {
    return this.http.put(this.url, genero);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
