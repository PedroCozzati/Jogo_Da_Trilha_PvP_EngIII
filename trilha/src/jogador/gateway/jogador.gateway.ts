import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
  } from '@nestjs/websockets';
  import { Logger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: true,
  })
  export class JogadorGateway implements OnGatewayInit, OnGatewayConnection {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private readonly _logger: Logger,
    ) { }
  
    async emiteJogadorRegistrado(body) {
      this.server.emit('jogadorRegistrado', body);
    }
  
    async handleConnection(client: Socket, ...args: any[]) {
      this._logger.log("cliente conectado", { client_id: client.id });
    }
  
    afterInit(server: Server) {
      this._logger.log("hub inicializado");
    }
  }