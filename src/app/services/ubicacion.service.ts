import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Ubicacion} from "../model/ubicacion";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private url = environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Ubicacion[]>();

  constructor() { }
  // Método para listar todas las opciones de pago
  list(): Observable<any> {
    return this.http.get(this.url + "/Listar_Ubicacion");
  }
  listID(id: number):Observable<any>{
    return this.http.get(this.url + "/UbicacionFind/"+ id);
  }
  // Método para insertar una nueva opción de pago
  insert(ubicacion: Ubicacion): Observable<any> {
    return this.http.post(this.url + "/Ubicacion", ubicacion);
  }

  // Método para modificar una opción de pago existente
  update(ubicacion: Ubicacion): Observable<any> {
    return this.http.put(this.url + "/Modificar_Ubicacion", ubicacion);
  }

  // Método para eliminar una opción de pago por su ID
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/Eliminar_Ubicacion/" +id);
  }

  setList(listaNueva: Ubicacion[]): void {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable<Ubicacion[]>{
    return this.listaCambio.asObservable();
  }
}
