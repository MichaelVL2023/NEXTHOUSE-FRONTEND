import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Mensaje} from "../model/mensaje";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url: string =environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio:Subject<Mensaje[]>= new Subject<Mensaje[]>();

  constructor() { }
  // Método para listar todos los mensajes
  list(): Observable<any> {
    return this.http.get<Mensaje[]>(this.url + "/Listar_Mensajes");
  }

  // Método para obtener un mensaje por ID
  listId(id: number): Observable<any> {
    console.log(this.url + "/MensajeFind/" + id); // Corrigiendo la ruta para que coincida con el backend
    return this.http.get<Mensaje[]>(this.url + "/MensajeFind/" + id);
  }

  // Método para insertar un nuevo mensaje
  insert(mensaje: Mensaje): Observable<any> {
    return this.http.post(this.url + "/Mensaje", mensaje);
  }

  // Método para modificar un mensaje existente
  update(mensaje: Mensaje): Observable<any> {
    return this.http.put(this.url + "/Modificar_Mensaje", mensaje);
  }

  // Método para eliminar un mensaje por ID
  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + "/Eliminar_Mensaje/" + id);
  }
  // Método para actualizar la lista de mensajes (Subject para cambio reactivo)
  setList(listaNueva: Mensaje[]) {
    this.listaCambio.next(listaNueva);
  }

  // Método para obtener los cambios en la lista
  getListaCambio(): Observable<Mensaje[]> {
    return this.listaCambio.asObservable();
  }
}
