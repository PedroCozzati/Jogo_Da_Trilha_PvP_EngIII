import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: false,
  transports: ['polling', 'websocket'],
})
export class JogadorGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
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

  async handleDisconnect(client: any) {
    this._logger.log("cliente desconectado", { client_id: client.id });
  }

  afterInit(server: Server) {
    this._logger.log("hub inicializado");
  }
}