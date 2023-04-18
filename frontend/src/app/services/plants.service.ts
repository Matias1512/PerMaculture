import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.interface'
import { Observable } from 'rxjs';

const PLANTS_ENDPOINT = 'http://localhost:3000/plants';

export type PostPlant = {
  name: string;
  description: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(PLANTS_ENDPOINT);
  }

  postPlant(plant?: PostPlant): Observable<Plant> {
    console.log("Post plant:", plant)
    if (!plant) plant = {
      name: 'Test Plant',
      description: 'This is a test plant',
      image_url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }
    return this.http.post<Plant>(PLANTS_ENDPOINT, plant);
  }

}
