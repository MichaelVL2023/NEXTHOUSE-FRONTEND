import {inject, Injectable} from '@angular/core';
import {Usuario} from "../model/usuario";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Usuario[]>();

  constructor() { }
  list(): Observable<any> {
    return this.http.get<Usuario[]>(this.url + "/Listar_Usuario");
  }

  listId(id: number): Observable<any> {
    return this.http.get<Usuario[]>(this.url + "/UsuarioFind/" + id);
  }

  insert(usuario: Usuario): Observable<any> {
    return this.http.post(this.url+ "/Usuario", usuario);
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put(this.url + "/Modificar_Usuario", usuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/Eliminar_Usuraio/" + id);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva); // Enviar la nueva lista a los suscriptores
  }

  getList(): Observable<Usuario[]> {
    return this.listaCambio.asObservable();
  }
}
