import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Menu } from './../_model/menu';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  url: string = `${environment.HOST}`;    

  constructor(private http: HttpClient) { }

  listar() {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string) {
    let access_token = sessionStorage.getItem(environment.TOKEN_NAME)
    
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
