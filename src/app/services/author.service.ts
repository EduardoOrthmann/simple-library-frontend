import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import Author from '../interfaces/Author';
import { HttpClient } from '@angular/common/http';
import AuthorName from '../interfaces/AuthorName';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends BaseCrudService<Author, string> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/author`);
  }

  getAllNames(): Observable<AuthorName[]> {
    return this.http.get<AuthorName[]>(`${this.apiUrl}/names`);
  }
}
