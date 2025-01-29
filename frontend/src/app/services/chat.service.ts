import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io(environment.apiUrl);

  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', msg => observer.next(msg));
    });
  }

  loadPreviousMessages(): Observable<any[]> {
    return new Observable(observer => {
      this.socket.on('loadMessages', (messages: any[]) => observer.next(messages));
    });
  }
}