import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneroDialogoComponent } from './pages/genero/genero-dialogo/genero-dialogo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { ComidaComponent } from './pages/comida/comida.component';
import { ComidaDialogoComponent } from './pages/comida/comida-dialogo/comida-dialogo.component';
import { VentaComponent } from './pages/venta/venta.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaDialogoComponent } from './pages/consulta/consulta-dialogo/consulta-dialogo.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { NuevoComponent } from './pages/login/nuevo/nuevo.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteDialogoComponent } from './pages/cliente/cliente-dialogo/cliente-dialogo.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  //console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    GeneroComponent,
    PeliculaComponent,
    GeneroDialogoComponent,
    PeliculaEdicionComponent,
    ComidaComponent,
    ComidaDialogoComponent,
    VentaComponent,
    ReporteComponent,
    ConsultaComponent,
    ConsultaDialogoComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    NuevoComponent,
    PerfilComponent,
    ClienteComponent,
    ClienteDialogoComponent
  ],
  entryComponents: [GeneroDialogoComponent, ComidaDialogoComponent, ConsultaDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
