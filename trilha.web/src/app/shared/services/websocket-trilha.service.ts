import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class SocketTrilha extends Socket {
  constructor() {
    super({ url: 'http://localhost:90', options: {  } });
  }
}

@Injectable()
export class WebSocketTrilhaService {

  novoJogadorRegistrado$ = this.socket.fromEvent<any>('jogadorRegistrado');

  constructor(private socket: SocketTrilha) { }
}
