import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Pago} from "../model/pago";
import {Comentario} from "../model/comentario";
import {Query8dto} from '../model/query8dto';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url: string =environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio:Subject<Comentario[]>= new Subject<Comentario[]>();

  constructor() { }
  // Método para listar todos los mensajes
  list(): Observable<any> {
    return this.http.get<Comentario[]>(this.url + "/Listar_Comentarios");
  }

  // Método para obtener un mensaje por ID
  listId(id: number): Observable<any> {
    return this.http.get<Comentario[]>(this.url + "/ComentarioFind/" + id);
  }

  // Método para insertar un nuevo mensaje
  insert(comentario: Comentario): Observable<any> {
    return this.http.post(this.url + "/Comentario", comentario);
  }

  // Método para modificar un mensaje existente
  update(comentario: Comentario): Observable<any> {
    return this.http.put(this.url + "/Modificar_Comentario", comentario);
  }

  // Método para eliminar un mensaje por ID
  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + "/Eliminar_Comentario/" + id);
  }
  // Método para actualizar la lista de mensajes (Subject para cambio reactivo)
  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  // Método para obtener los cambios en la lista
  getListaCambio(): Observable<Comentario[]> {
    return this.listaCambio.asObservable();
  }

  listQuery8(): Observable<Query8dto[]> {
    return this.http.get<Query8dto[]>(this.url + "/ComentarioQuery8");
  }

}
