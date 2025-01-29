import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

// login.component.ts
login() {
  this.authService.login({ username: this.username, password: this.password }).subscribe(
    res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', this.username);  // Guardamos el nombre de usuario
      this.router.navigate(['/chat']);
    },
    err => alert('Error al iniciar sesión')
  );
}

}