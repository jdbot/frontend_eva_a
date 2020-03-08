import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'genero', component: GeneroComponent },
  {
    path: 'pelicula', component: PeliculaComponent, children: [
      { path: 'nuevo', component: PeliculaEdicionComponent },
      { path: 'edicion/:id', component: PeliculaEdicionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
