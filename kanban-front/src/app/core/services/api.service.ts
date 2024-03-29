import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Board } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.url}/boards`);
  }
}
