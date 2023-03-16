import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class SocketTrilha extends Socket {
  constructor() {
    super({ url: 'https://4809-177-62-115-13.ngrok.io', options: {  } });
  }
}

@Injectable()
export class WebSocketTrilhaService {

  novoJogadorRegistrado$ = this.socket.fromEvent<any>('jogadorRegistrado');

  constructor(private socket: SocketTrilha) { }
}
