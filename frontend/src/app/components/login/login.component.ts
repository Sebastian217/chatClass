import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('role', res.user.role);
        this.router.navigate(['/chat']);
      },
      err => {
        if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Intentar de nuevo'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión',
            confirmButtonColor: '#d33'
          });
        }
      }
    );
  }

  // Función que valida si los campos están llenos
  isFormValid(): boolean {
    return this.username !== '' && this.password !== '';
  }
}
