import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Keeper, LoginKeeper } from '../models/keeper.interface';

const LOGIN_ENDPOINT = 'http://localhost:3000/login';

@Injectable({
	providedIn: 'root'
})
export class AuthentifierService {
	mainUrl = 'http://localhost:3000';

	constructor(private http: HttpClient) { }

	registerKeeper(keeper: Keeper) {}

	loginKeeper(keeper: LoginKeeper) {
		return this.http.post(LOGIN_ENDPOINT, keeper);
	}
}
