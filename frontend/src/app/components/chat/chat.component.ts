// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message: string = '';
  user: string = '';
  role: string = '';
  color: string = '';
  colorOther: string = '';

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.user = localStorage.getItem('username') || 'Anónimo';  // Recuperamos el nombre del usuario desde el localStorage
    this.role = localStorage.getItem('role') || '';  // Recuperamos el nombre del usuario desde el localStorage
    this.chatService.receiveMessages().subscribe(msg => this.messages.push(msg));  // Recibir mensajes del servidor
    this.color = this.getRandomColor()
    this.colorOther = this.getRandomColor()
  }

  sendMessage() {
    if (this.message.trim()) {
      // Enviar el mensaje con el nombre del usuario
      this.chatService.sendMessage({ user: this.user, text: this.message });
      this.message = '';  // Limpiar el campo de mensaje después de enviarlo
    }
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirma el cierre de sesión
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
  
}
