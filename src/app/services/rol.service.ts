import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Rol} from "../model/rol";
import {Observable, Subject} from "rxjs";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url=environment.apiUrl + '/NextHouse';
  private http: HttpClient=inject(HttpClient);
  private listaCambio=new Subject<Rol[]>();

  constructor() { }
  lis(): Observable<any>{
    return this.http.get<Rol[]>(this.url+"/Listar_Rol");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/Rol/" + id)
    return this.http.get<Usuario[]>(this.url + "/Rol/" + id);
  }

  setList(listaNueva : Rol[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList():Observable<Rol[]> {
    return this.listaCambio.asObservable();
  }
}
