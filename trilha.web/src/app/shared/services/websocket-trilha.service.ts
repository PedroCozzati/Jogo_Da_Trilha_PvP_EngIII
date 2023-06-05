import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AppService } from "./app.service";

@Injectable()
export class SocketTrilha extends Socket {
  constructor(
    appService: AppService
    ) {
    super({
      url: 'http://localhost:90', options: {
        query: {
          "jogadorId": appService.userInfos._id
        }
      }
    });
  }
}

@Injectable()
export class WebSocketTrilhaService {
  partidaModificada$ = this.socket.fromEvent<any>('partidaModificada');

  constructor(private socket: SocketTrilha) { }

  disconnect = () => this.socket.disconnect();
}
