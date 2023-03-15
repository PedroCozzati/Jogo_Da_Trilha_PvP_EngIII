import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class SocketTrilha extends Socket {
  constructor() {
    super({ url: 'https://4278-177-62-115-13.ngrok.io', options: { transports: ['websocket', 'polling', 'flashsocket'] } });
  }
}

@Injectable()
export class WebSocketTrilhaService {

  novoJogadorRegistrado$ = this.socket.fromEvent<any>('jogadorRegistrado');

  constructor(private socket: SocketTrilha) { }
}
