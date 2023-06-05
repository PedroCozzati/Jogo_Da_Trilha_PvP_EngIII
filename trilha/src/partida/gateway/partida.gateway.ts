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
import { PartidaService } from '../application/services/partida.service';

@WebSocketGateway({
    cors: { origin: '*' },
})
@Injectable()
export class PartidaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly _logger: Logger,
        @Inject(CACHE_MANAGER) private readonly _cacheService: Cache,
        private readonly _partidaService: PartidaService,
    ) { }

    async emiteEstadoAtual(body, jogadorId: string) {
        this._logger.log("tipo do id do jogador", { tipo: typeof(jogadorId), id: jogadorId });
        const webSocketClientId = await this._cacheService.get(jogadorId.toString());
        this.server.to(webSocketClientId.toString()).emit('partidaModificada', await body);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        const idJogador = client.handshake.query.jogadorId.toString();

        if (!idJogador)
            return

        await this._cacheService.set(idJogador, client.id)
        this.server.emit('partidaModificada', await this._partidaService.buscaPartidaPorJogador({ id_jogador: idJogador }));

        this._logger.log("cliente conectado", { client_id: client.id, jogador_id: idJogador });
    }

    async handleDisconnect(client: any) {
        this._logger.log("argumentos no disconnect", { args: JSON.stringify(client.handshake.query) });
        this._logger.log("cliente desconectado", { client_id: client.id });
    }

    afterInit(server: Server) {
        this._logger.log("gateway inicializado");
    }
}