import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseCrudService<T, ID> {
  constructor(public http: HttpClient, public apiUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  save(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: ID, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`);
  }
}
