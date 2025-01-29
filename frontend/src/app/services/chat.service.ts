import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io('http://localhost:5000');

  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', msg => observer.next(msg));
    });
  }
}