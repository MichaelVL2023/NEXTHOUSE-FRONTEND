import {Ubicacion} from "./ubicacion";
import {Usuario} from "./usuario";

export class Propiedad {
    idPropiedad:number;
    titulo:string;
    descripcion:string;
    precio:number;
    tipo:string;
    estado:string;
    fechaPublicacion:Date=new Date();
    descripcionUsuario:string;
    ubicacion: Ubicacion;
    usuario:Usuario;
}
