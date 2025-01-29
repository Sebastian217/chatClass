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
  userName: string = '';
  role: string = '';
  color: string = '';
  colorOther: string = '';

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.user = sessionStorage.getItem('username') || 'Anónimo';
    this.userName = sessionStorage.getItem('name') || '';
    this.role = sessionStorage.getItem('role') || '';

    // Cargar mensajes previos
    this.chatService.loadPreviousMessages().subscribe((prevMessages) => {
      this.messages = prevMessages;
    });

    // Escuchar mensajes en tiempo real
    this.chatService.receiveMessages().subscribe(msg => this.messages.push(msg));

    this.color = this.getRandomColor();
    this.colorOther = this.getRandomColor();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendMessage({ user: this.user, text: this.message, role: this.role });
      this.message = '';
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
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
