
import { Usuario } from 'src/app/_model/usuario';

export class Cliente {
    idCliente: number;
    usuario: Usuario;
    nombres: string;
    apellidos: string;
    fechaNac: Date;
    dni: string;
    _foto: any;
    _isFoto: boolean;
}