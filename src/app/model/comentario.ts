import {Propiedad} from "./propiedad";
import {Usuario} from "./usuario";

export class Comentario {
    idComentario:number;
    calificacion:string;
    tipoUsuario: string;
    fechaComentario:Date = new Date();
    comentario:string;
    propiedad:Propiedad;
    usuario:Usuario;
}
