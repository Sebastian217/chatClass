import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  role = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.role) {
      alert('Debe seleccionar un rol');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role
    };

    this.authService.register(user).subscribe(
      res => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      err => alert('Error al registrar usuario')
    );
  }
}
