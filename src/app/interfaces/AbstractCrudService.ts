import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export default class Crud<T, ID> {
  BASE_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient, private resourceName: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.BASE_URL + this.resourceName);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.BASE_URL + this.resourceName, entity);
  }

  update(id: ID, entity: T): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL + this.resourceName}/${id}`, entity);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL + this.resourceName}/${id}`);
  }
}
