import { headers } from './../../enviroment';
import { environment } from 'src/enviroment';
import { Sorteios } from './../interfaces/sorteios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorteiosService {

  constructor(private http: HttpClient) { }

  getSorteios(): Observable<Sorteios[]>{
    return this.http.get<Sorteios[]>(environment.apiUrl+"sorteios", {headers})
  }

  getByTitulo(titulo: string): Observable<Sorteios>{
    return this.http.get<Sorteios>(environment.apiUrl+"sorteios/" + titulo, {headers})
  }

  updateSorteios(state : string, id: string){
    return this.http.put(environment.apiUrl + "sorteios", [ state, id ], {headers})
  }

  postSorteios(body: any){
    return this.http.post(environment.apiUrl+ "sorteios", body, {headers})
  }

  deleteSorteios(id: number){
    return this.http.delete(environment.apiUrl+"sorteios/" + id, {headers})
  }

}
