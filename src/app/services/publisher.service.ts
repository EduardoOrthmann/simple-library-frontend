import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import Publisher from '../interfaces/Publisher';
import PublisherName from '../interfaces/PublisherName';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublisherService extends BaseCrudService<Publisher, string> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/publisher`);
  }

  getAllNames(): Observable<PublisherName[]> {
    return this.http.get<PublisherName[]>(`${this.apiUrl}/names`);
  }
}
