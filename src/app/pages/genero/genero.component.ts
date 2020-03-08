import { switchMap } from 'rxjs/operators';
import { GeneroDialogoComponent } from './genero-dialogo/genero-dialogo.component';
import { Genero } from './../../_model/genero';
import { GeneroService } from './../../_service/genero.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  dataSource: MatTableDataSource<Genero>;
  displayedColumns: string[] = ['idGenero', 'nombre', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private generoService: GeneroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.generoService.generoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.generoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(genero?: Genero) {
    let gen = genero != null ? genero : new Genero();
    this.dialog.open(GeneroDialogoComponent, {
      width: '250px',
      data: gen
    });
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero.idGenero).pipe(switchMap(() => {
      return this.generoService.listar();
    })).subscribe(data => {
      this.generoService.generoCambio.next(data);
      this.generoService.mensajeCambio.next('SE ELIMINO');
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }
}
