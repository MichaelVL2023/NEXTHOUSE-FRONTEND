import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OpcionesPago} from "../model/opciones-pago";
import {Observable, Subject} from "rxjs";
import {Query1dto} from '../model/query1dto';

@Injectable({
  providedIn: 'root'
})
export class OpcionesPagoService {
  private url=environment.apiUrl + '/NextHouse';
  private http:HttpClient = inject(HttpClient);
  private listaCambio: Subject<OpcionesPago[]> = new Subject<OpcionesPago[]>();

  constructor() { }
  // Método para listar todas las opciones de pago
  list(): Observable<any> {
    return this.http.get(this.url + "/Listar_OpcionesPago");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/opcionesPadoFind/"+ id);
  }
  // Método para insertar una nueva opción de pago
  insert(opcionesPago: OpcionesPago): Observable<any> {
    return this.http.post(this.url + "/OpcionesPago", opcionesPago);
  }

  // Método para modificar una opción de pago existente
  update(opcionesPago: OpcionesPago): Observable<any> {
    return this.http.put(this.url + "/Modificar_OpcionesPago", opcionesPago);
  }

  // Método para eliminar una opción de pago por su ID
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/Eliminar_OpcionesPago/" +id);
  }

  setList(listaNueva: OpcionesPago[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<OpcionesPago[]>{
    return this.listaCambio.asObservable();
  }

  listQuery1(): Observable<any> {
    return this.http.get(this.url + "/Query1_OpcionesPago");
  }
}
