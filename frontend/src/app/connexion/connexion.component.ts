import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  error_message = '';
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
  }

  get emailError() {
    return (
      this.loginForm.get('email')?.invalid &&
      (this.loginForm.get('email')?.dirty ||
        this.loginForm.get('email')?.touched)
    );
  }

  get passwordError() {
    return (
      this.loginForm.get('password')?.invalid &&
      (this.loginForm.get('password')?.dirty ||
        this.loginForm.get('password')?.touched)
    );
  }
}
