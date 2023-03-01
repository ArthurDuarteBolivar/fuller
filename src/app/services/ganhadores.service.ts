import { environment, headers } from 'src/enviroment';
import { Ganhadores } from './../interfaces/ganhadores';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GanhadoresService {

  constructor(private http: HttpClient) { }


  getGanhadores(): Observable<Ganhadores[]>{
    return this.http.get<Ganhadores[]>(environment.apiUrl + "ganhadores", {headers})
  }

  postGanhadores(body: Ganhadores): Observable<Ganhadores>{
    return this.http.post<Ganhadores>(environment.apiUrl + "ganhadores", body, {headers})
  }
}
