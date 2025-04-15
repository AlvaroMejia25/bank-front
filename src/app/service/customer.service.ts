import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url:string=`${environment.apiurl}/api/v1/customers`

  constructor(public httpClient:HttpClient ) { }

  findAll():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.url}/findAll`);
  }
  findById(id:number):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.url}/${id}`);
  }
  save(customer:Customer):Observable<Customer>{
    return this.httpClient.post<Customer>(this.url,customer);
  }
  update(customer:Customer):Observable<Customer>{
    return this.httpClient.post<Customer>(this.url,customer);
  }
  delete(id:number):Observable<any>{
    return this.httpClient.delete<Customer>(`${this.url}/${id}`);
  }
}
