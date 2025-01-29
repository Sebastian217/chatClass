// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message: string = '';
  user: string = '';  // Variable para almacenar el nombre del usuario
  color: string = '';
  colorOther: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.user = localStorage.getItem('username') || 'Anónimo';  // Recuperamos el nombre del usuario desde el localStorage
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
}
