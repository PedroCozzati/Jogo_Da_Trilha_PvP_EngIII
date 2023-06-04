import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from 'nestjs-pino';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
})
@Injectable()
export class PartidaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly _logger: Logger,
        @Inject(CACHE_MANAGER) private readonly _cacheService: Cache
    ) { }

    async emiteEstadoAtual(body) {
        this.server.emit('partidaModificada', await body);
    }

    async handleConnection(client: Socket, ...args: any[]) {

        this._cacheService.set(client.handshake.headers["web-socket-client-id"].toString(), client.id)

        this._logger.log("cliente conectado", { client_id: client.id });
    }

    async handleDisconnect(client: any) {
        this._logger.log("cliente desconectado", { client_id: client.id });
    }

    afterInit(server: Server) {
        this._logger.log("gateway inicializado");
    }
}