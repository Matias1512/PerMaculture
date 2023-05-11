import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Config from 'src/config';
import {Arbres} from "../models/arbres.interface";

const ARBRES_ENDPOINT = `${Config.API_ENDPOINT}/trees`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

export type PostArbres = {
  name: string;
  description: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArbresService {

  constructor(private http: HttpClient) { }

  getArbres(): Observable<Arbres[]> {
    return this.http.get<Arbres[]>(ARBRES_ENDPOINT, httpOptions);
  }

  postArbres(arbre?: PostArbres): Observable<Arbres> {
    console.log("Post arbre:", arbre)
    if (!arbre) arbre = {
      name: 'Tournesol',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      image_url: 'https://static.aujardin.info/cache/th/img9/lilium-fleur-600x450.jpg'
    }
    return this.http.post<Arbres>(ARBRES_ENDPOINT, arbre);
  }

  deleteArbre(id: number): Observable<Arbres> {
    return this.http.delete<Arbres>(`${ARBRES_ENDPOINT}/${id}`);
  }

}
