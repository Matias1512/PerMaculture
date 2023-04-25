import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Keeper, LoginKeeper } from '../models/keeper.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthentifierService {
	keepersEndpoint = 'http://localhost:3000/keepers';

	constructor(private http: HttpClient) { }

	registerKeeper(keeper: Keeper) {}

	loginKeeper(keeper: LoginKeeper) {}
}
