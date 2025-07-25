import {Usuario} from "./usuario";
export class Mensaje {
    idMensaje:number;
    contenido:string;
    fechaEnvio: Date = new Date();
    tipo:string;
    usuario:Usuario;
}
