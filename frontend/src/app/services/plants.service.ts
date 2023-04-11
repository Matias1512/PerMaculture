import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Plant {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient) { }

  getPlants() {
    return this.http.get<Plant[]>('http://localhost:3000/plants');
  }

}
