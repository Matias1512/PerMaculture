import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.interface'
import { Observable } from 'rxjs';

import Config from 'src/config';

const PLANTS_ENDPOINT = `${Config.API_ENDPOINT}/plants`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

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
    return this.http.get<Plant[]>(PLANTS_ENDPOINT, httpOptions);
  }

  postPlant(plant?: PostPlant): Observable<Plant> {
    console.log("Post plant:", plant)
    if (!plant) plant = {
      name: 'Tournesol',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      image_url: 'https://static.aujardin.info/cache/th/img9/lilium-fleur-600x450.jpg'
    }
    return this.http.post<Plant>(PLANTS_ENDPOINT, plant);
  }

  deletePlant(id: number): Observable<Plant> {
    return this.http.delete<Plant>(`${PLANTS_ENDPOINT}/${id}`);
  }

}
