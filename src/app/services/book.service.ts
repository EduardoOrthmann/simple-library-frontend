import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Book from '../interfaces/Book';
import { BaseCrudService } from './base-crud.service';
import { Observable } from 'rxjs';
import Genre from 'src/app/interfaces/Genre';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseCrudService<Book, string> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/book');
  }

  override getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }
}
