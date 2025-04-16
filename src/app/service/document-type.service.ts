import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from '../domain/document-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  url: string = `${environment.apiurl}/api/v1/document-type`;

  constructor(public httpClient: HttpClient) { }

  findAll():Observable<DocumentType[]>{
    return this.httpClient.get<DocumentType[]>(`${this.url}/findAll`);
  }

  findById(id:number):Observable<DocumentType>{
    return this.httpClient.get<DocumentType>(`${this.url}/${id}`);
  }

}
