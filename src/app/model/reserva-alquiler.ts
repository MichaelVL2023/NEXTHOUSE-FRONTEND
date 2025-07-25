import {Usuario} from "./usuario";

export class ReservaAlquiler {
    idReserva: number;
    fechaInicio:Date = new Date();
    fechaFin: Date = new Date();
    precioMensual:number;
    estado:string;
    usuario:Usuario
}
