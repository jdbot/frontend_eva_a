import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './../../_service/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from './../../_service/cliente.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  imagenData: any;
  imagenEstado: boolean;
  rolesUsuario: string;
  nombreUsuario: string;
  idUsuario: any;

  constructor(private loginService: LoginService, private router: Router,
    private sanitization: DomSanitizer,private clienteService: ClienteService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let rpta = this.loginService.estaLogueado();

    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
    } else {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      const helper = new JwtHelperService();

      if (!helper.isTokenExpired(token)) {
        
        const decodedToken = helper.decodeToken(token);
        this.nombreUsuario = decodedToken.user_name;
        this.rolesUsuario = decodedToken.authorities;
        
        this.usuarioService.obtenerIDUsuario(this.nombreUsuario).subscribe((data:number) => {
          this.idUsuario = data;
          this.clienteService.listarPorId(this.idUsuario).subscribe(data => {
            if (data.size > 0) {
              this.convertir(data);
            }
          });
        });
        
      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
    }
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.sanar(base64);
    }
  }

  sanar(base64 : any){
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

}
