import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AppService } from "./app.service";

@Injectable()
export class SocketTrilha extends Socket {
  constructor(
    appService: AppService
    ) {
      // let json = localStorage.getItem('cache')
      // let jogadorId =JSON.parse(json!)
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
  emojiEnviado$ = this.socket.fromEvent<any>('emojiEmitido');
  moinhoEfetuado$ = this.socket.fromEvent<any>('moinhoEfetuado');
  constructor(private socket: SocketTrilha) { }

  emit(data:any,event:string){
    this.socket.emit(event,data)
  }

  disconnect = () => this.socket.disconnect();
}
