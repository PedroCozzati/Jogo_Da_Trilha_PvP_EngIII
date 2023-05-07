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
    cors: { origin: '*' },
})
export class PartidaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly _logger: Logger,
    ) { }

    async emiteEstadoAtual(body) {
        this.server.emit('estadoModificado', body);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this._logger.log("cliente conectado", { client_id: client.id });
    }

    async handleDisconnect(client: any) {
        this._logger.log("cliente desconectado", { client_id: client.id });
    }

    afterInit(server: Server) {
        this._logger.log("gateway inicializado");
    }
}