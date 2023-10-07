import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export abstract class BaseCrudService<T, ID> {
  constructor(private http: HttpClient, private apiUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  save(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, {
      ...item,
      id: uuidv4(),
    });
  }

  update(id: ID, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`);
  }
}
