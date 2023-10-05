import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Book from '../interfaces/Book';
import Crud from '../interfaces/AbstractCrudService';

@Injectable({
  providedIn: 'root',
})
export class BookService extends Crud<Book, number> {
  constructor(http: HttpClient) {
    super(http, 'book');
  }
}
