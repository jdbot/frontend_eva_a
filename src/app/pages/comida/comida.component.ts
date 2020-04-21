import { ComidaDialogoComponent } from './comida-dialogo/comida-dialogo.component';
import { ComidaService } from './../../_service/comida.service';
import { Comida } from './../../_model/comida';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Comida>;
  displayedColumns = ['idComida', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private comidaService: ComidaService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.comidaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.comidaService.comidaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.comidaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  openDialog(comida?: Comida) {
    let com = comida != null ? comida : new Comida();
    this.dialog.open(ComidaDialogoComponent, {
      width: '250px',
      data: com
    });
  }

  eliminar(genero: Comida) {
    this.comidaService.eliminar(genero.idComida).subscribe(data => {
      this.comidaService.listar().subscribe(data => {
        this.comidaService.comidaCambio.next(data);
        this.comidaService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
