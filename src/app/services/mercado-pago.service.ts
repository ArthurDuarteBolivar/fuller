import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer APP_USR-3880497390082482-022611-73e974bdf3e79234101fd3a4eb47b60d-1132553338'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://api.mercadopago.com/v1/payments';

  createPayment(data: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, data, httpOptions);

  }

  getPayment(id: number){
    return this.http.get(`https://api.mercadopago.com/v1/payments/${id}`, httpOptions)
  }

}
