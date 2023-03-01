import { Observable } from 'rxjs';
import { environment, headers } from 'src/enviroment';
import { Logins } from './../interfaces/logins';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  constructor(private http: HttpClient) { }

  getNumber(telefone: string): Observable<Logins[]>{
    return this.http.get<Logins[]>(environment.apiUrl+ "logins/" + telefone, {headers})
  }

  postLogin(logins: Logins): Observable<Logins>{
    return this.http.post<Logins>(environment.apiUrl+"logins", logins, {headers})
  }

  getLogins(): Observable<Logins[]>{
    return this.http.get<Logins[]>(environment.apiUrl+"logins", {headers})
  }

}
