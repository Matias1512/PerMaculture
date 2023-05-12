import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Config from 'src/config';
import {Insectes} from "../models/insectes.interface";

const BUGS_ENDPOINT = `${Config.API_ENDPOINT}/bugs`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

export type PostInsects = {
  name: string;
  description: string;
  image_url: string;
  pollinator: Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  constructor(private http: HttpClient) { }

  getInsect(): Observable<Insectes[]> {
    return this.http.get<Insectes[]>(BUGS_ENDPOINT, httpOptions);
  }

  postInsects(insect?: PostInsects): Observable<Insectes> {
    console.log("Post insect:", insect)
    if (!insect) insect = {
      name: 'Tournesol',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      image_url: 'https://static.aujardin.info/cache/th/img9/lilium-fleur-600x450.jpg',
      pollinator: true
    }
    return this.http.post<Insectes>(BUGS_ENDPOINT, insect);
  }

  deleteInsect(id: number): Observable<Insectes> {
    return this.http.delete<Insectes>(`${BUGS_ENDPOINT}/${id}`);
  }

}
