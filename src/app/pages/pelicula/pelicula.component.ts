import { switchMap } from 'rxjs/operators';
import { PeliculaService } from './../../_service/pelicula.service';
import { Pelicula } from './../../_model/pelicula';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  dataSource: MatTableDataSource<Pelicula>;
  displayedColumns = ['idPelicula', 'nombre', 'genero', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private peliculaService: PeliculaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.peliculaService.peliculaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.peliculaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.peliculaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  eliminar(idPelicula : number){
    this.peliculaService.eliminar(idPelicula).pipe(switchMap( () => {
      return this.peliculaService.listar();
    })).subscribe(data => {
      this.peliculaService.peliculaCambio.next(data);
      this.peliculaService.mensajeCambio.next('SE ELIMINO');
    });
  }
}
