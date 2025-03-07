import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = ''; // Nuevo campo para el nombre
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (!this.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre obligatorio',
        text: 'Debe ingresar su nombre completo',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
        text: 'Verifica que ambas contraseñas sean iguales',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    if (!this.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Rol no seleccionado',
        text: 'Debe seleccionar un rol para continuar',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(user).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'Ir al login'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un problema al registrar tu cuenta',
          confirmButtonColor: '#d33'
        });
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
