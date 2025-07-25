import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Pago} from "../model/pago";
import {Query5dto} from '../model/query5dto';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url: string =environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio:Subject<Pago[]>= new Subject<Pago[]>();

  constructor() { }
  // Método para listar todos los mensajes
  list(): Observable<any> {
    return this.http.get<Pago[]>(this.url + "/Listar_Pago");
  }

  // Método para obtener un mensaje por ID
  listId(id: number): Observable<any> {
    return this.http.get<Pago[]>(this.url + "/PagoFind/" + id);
  }

  // Método para insertar un nuevo mensaje
  insert(pago: Pago): Observable<any> {
    return this.http.post(this.url + "/Pago", pago);
  }

  // Método para modificar un mensaje existente
  update(pago: Pago): Observable<any> {
    return this.http.put(this.url + "/Modificar_Pago", pago);
  }

  // Método para eliminar un mensaje por ID
  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + "/Eliminar_Pago/" + id);
  }
  // Método para actualizar la lista de mensajes (Subject para cambio reactivo)
  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }

  // Método para obtener los cambios en la lista
  getListaCambio(): Observable<Pago[]> {
    return this.listaCambio.asObservable();
  }

  listQuery5(startDate: Date, endDate: Date): Observable<Query5dto[]> {
    const formattedstartDate = startDate.toISOString().split('T')[0];
    const formattedendDate = endDate.toISOString().split('T')[0];
    const url = `http://localhost:8080/NextHouse/PagoQuery5/${formattedstartDate}/${formattedendDate}`;
    return this.http.get<Query5dto[]>(url);
  }
}
