import { Injectable } from '@angular/core';
import { Board } from '../models/model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private apiService: ApiService) {}
}
