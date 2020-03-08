import { GeneroService } from './../../../_service/genero.service';
import { PeliculaService } from './../../../_service/pelicula.service';
import { Genero } from './../../../_model/genero';
import { Pelicula } from './../../../_model/pelicula';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pelicula-edicion',
  templateUrl: './pelicula-edicion.component.html',
  styleUrls: ['./pelicula-edicion.component.css']
})
export class PeliculaEdicionComponent implements OnInit {

  pelicula: Pelicula;
  id: number;
  edicion: boolean;
  form: FormGroup;
  generos: Genero[];
  idGeneroSeleccionado: number;
  urlImagen: string;

  constructor(private route : ActivatedRoute, 
    private peliculaService : PeliculaService, 
    private generoService: GeneroService,
    private router : Router) { }

    ngOnInit() {
      this.form = new FormGroup({
        'idPelicula': new FormControl(0),
        'nombre': new FormControl(''),
        'resena': new FormControl(''),
        'duracion': new FormControl(0),
        'fechaPublicacion': new FormControl(new Date()),
        'urlPortada': new FormControl(''),
        'genero': new FormControl('')
      });

      this.listarGeneros();
    }

    listarGeneros(){
      this.generoService.listar().subscribe(data => {
        this.generos = data;
      });
    }

}
