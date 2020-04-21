import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from './../../../_service/cliente.service';
import { Usuario } from './../../../_model/usuario';
import * as moment from 'moment';
import { Cliente } from './../../../_model/cliente';
import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {

  usuario: Usuario;
  maxFecha: Date;
  cliente: Cliente;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(private dialogRef: MatDialogRef<ClienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private clienteService: ClienteService,
    private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.maxFecha = new Date();
    this.usuario = new Usuario();
    if (this.data.idCliente > 0) {
      this.cliente.idCliente = this.data.idCliente;
      this.cliente.nombres = this.data.nombres;
      this.cliente.apellidos = this.data.apellidos;
      this.cliente.dni = this.data.dni;
      this.cliente.fechaNac = new Date(moment(this.data.fechaNac).format('YYYY-MM-DDTHH:mm:ss'));
      //this.usuario.nombre = this.data._usuario.nombre;
      //this.usuario.clave = this.data._usuario.clave;
      //this.usuario.estado = true;
      //this.cliente._usuario = this.usuario;
      this.clienteService.listarPorId(this.data.idCliente).subscribe(data => {
        if (data.size > 0) {
          this.convertir(data);
        }
      });
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

  operar() {

    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }

    if (this.cliente != null && this.cliente.idCliente > 0) {
      this.clienteService.modificar(this.cliente, this.currentFileUpload).subscribe(data => {
        this.clienteService.listar().subscribe(clientes => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.clienteService.registrar(this.cliente, this.currentFileUpload).subscribe(data => {
        this.clienteService.listar().subscribe(clientes => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

  seleccionarArchivo(e: any) {
    console.log(e);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    
  }

  cancelar() {
    this.dialogRef.close();
  }
}
