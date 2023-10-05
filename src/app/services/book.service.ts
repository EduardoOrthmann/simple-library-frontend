import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get('http://localhost:3000/book');
  }

  addBook(book: any): Observable<any> {
    return this.http.post('http://localhost:3000/book', book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`http://localhost:3000/book/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/book/${id}`);
  }
}
