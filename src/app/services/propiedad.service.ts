import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ReservaAlquiler} from "../model/reserva-alquiler";
import {Propiedad} from "../model/propiedad";
import {Query2dto} from '../model/query2dto';
import {Query4dto} from '../model/query4dto';
import {Query6dto} from '../model/query6dto';
import {Query7dto} from '../model/query7dto';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private url: string =environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio:Subject<Propiedad[]>= new Subject<Propiedad[]>();

  constructor() { }
  // Método para listar todos los mensajes
  list(): Observable<any> {
    return this.http.get<Propiedad[]>(this.url + "/Listar_Propiedad");
  }

  // Método para obtener un mensaje por ID
  listId(id: number): Observable<any> {
    return this.http.get<Propiedad[]>(this.url + "/PropiedadFind/" + id);
  }

  // Método para insertar un nuevo mensaje
  insert(propiedad: Propiedad): Observable<any> {
    return this.http.post(this.url + "/Propiedad", propiedad);
  }

  // Método para modificar un mensaje existente
  update(propiedad: Propiedad): Observable<any> {
    return this.http.put(this.url + "/Modificar_Propiedad", propiedad);
  }

  // Método para eliminar un mensaje por ID
  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + "/Eliminar_Propiedad/" + id);
  }
  // Método para actualizar la lista de mensajes (Subject para cambio reactivo)
  setList(listaNueva: Propiedad[]) {
    this.listaCambio.next(listaNueva);
  }

  // Método para obtener los cambios en la lista
  getListaCambio(): Observable<Propiedad[]> {
    return this.listaCambio.asObservable();
  }


  listQuery2(): Observable<Query2dto[]> {
    return this.http.get<Query2dto[]>(this.url + "/Query2_Propiedad");
  }

  // Método para obtener la lista basada en Query4dto
  listQuery4(): Observable<Query4dto[]> {
    return this.http.get<Query4dto[]>(this.url + "/Query4_Propiedad");
  }

  listQuery6(startDate: Date, endDate: Date): Observable<Query6dto[]> {
    const formattedstartDate = startDate.toISOString().split('T')[0];
    const formattedendDate = endDate.toISOString().split('T')[0];
    const url = `http://localhost:8080/NextHouse/PropiedadQuery6/${formattedstartDate}/${formattedendDate}`;
    return this.http.get<Query6dto[]>(url);
  }

  listQuery7(ciudad: string): Observable<Query7dto[]> {
    const url = `http://localhost:8080/NextHouse/PropiedadQuery7/${ciudad}`;
    return this.http.get<Query7dto[]>(url);
  }
}
