import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Book from '../interfaces/Book';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseCrudService<Book, number> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/book');
  }
}
