import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.component.html',
	styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
	formStatus = {
		loading: false,
		success: false,
	}
	loginForm = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		])
	})

	constructor(private http: HttpClient) { }

	onSubmit() {
		this.formStatus.loading = true
		this.http.post('http://localhost:3000/login', this.loginForm.value).subscribe((res: any) => {
			console.log(res)
			// localStorage.setItem('token', res.token)
			// localStorage.setItem('user', JSON.stringify(res.user))
			this.formStatus.loading = false
			this.loginForm.reset()
		})
	}
}
