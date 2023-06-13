import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AppService } from "./app.service";

@Injectable()
export class SocketTrilha extends Socket {
  constructor(
    appService: AppService
  ) {
    super({
      url: 'http://15.229.11.82:90', options: {
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
  emojiEnviado$ = this.socket.fromEvent<any>('emojiEmitido');
  moinhoEfetuado$ = this.socket.fromEvent<any>('moinhoEfetuado');
  partidaFinalizada$ = this.socket.fromEvent<any>('partidaFinalizada');
  revancheRecusada$ = this.socket.fromEvent<any>('revancheRecusada');
  revancheConfirmada$ = this.socket.fromEvent<any>('revancheConfirmada');

  constructor(private socket: SocketTrilha) { }

  emit(data: any, event: string) {
    this.socket.emit(event, data)
  }

  disconnect = () => this.socket.disconnect();
}
