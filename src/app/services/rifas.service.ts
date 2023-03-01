import { Logins } from './../interfaces/logins';
import { Rifas } from './../interfaces/rifas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, headers } from 'src/enviroment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RifasService {



  constructor(private http: HttpClient) { }

  getRifas():Observable<Rifas[]> {
    return this.http.get<Rifas[]>(environment.apiUrl+"rifas", {headers})
  }

  postRifas(body: any) : Observable<Rifas>{
     return this.http.post<Rifas>(environment.apiUrl + "rifas", body,{headers})
  }

  deleteRifas(id: number){
    return this.http.delete(environment.apiUrl+"rifas/" + id, {headers})
  }

}
