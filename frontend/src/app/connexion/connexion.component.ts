import { Component } from '@angular/core'
import { Keeper } from '../models/keeper.interface'
import { AuthentifierService } from '../services/authentifier.service'

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.component.html',
	styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
	submitted = false
	model: Keeper = {
		userName: '',
		displayName: '',
		email: '',
		password: '',
		isAdmin: false
	}

	constructor(private service: AuthentifierService) { }

	onSubmit() {
		this.submitted = true
	}

	newGardener() {
		this.model = {
			userName: '',
			displayName: '',
			email: '',
			password: '',
			isAdmin: false
		}
	}
}
