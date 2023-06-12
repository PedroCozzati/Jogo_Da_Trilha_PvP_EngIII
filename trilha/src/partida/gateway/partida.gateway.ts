import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from 'nestjs-pino';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
import { PartidaService } from '../application/services/partida.service';
import { Span } from 'nestjs-otel';

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

    @Span()
    async emiteEstadoAtual(body, jogadorId: string) {
        try {
            const webSocketClientId = await this._cacheService.get(jogadorId.toString());
            this.server.to(webSocketClientId.toString()).emit('partidaModificada', await body);
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }

    @Span()
    async emiteMoinho(body, jogadorId: string) {
        try {
            const webSocketClientId = await this._cacheService.get(jogadorId.toString());
            this.server.to(webSocketClientId.toString()).emit('moinhoEfetuado', await body);
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }    

    @Span()
    async emiteResultadoVencedorPartida(vencedor: string) {
        try {
            const webSocketClientId = await this._cacheService.get(vencedor.toString());
            this.server.to(webSocketClientId.toString()).emit('partidaFinalizada', 'game-win');
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }
    
    @Span()
    async emiteResultadoPerdedorPartida(perdedor: string) {
        try {
            const webSocketClientId = await this._cacheService.get(perdedor.toString());
            this.server.to(webSocketClientId.toString()).emit('partidaFinalizada', 'game-lose');
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }
    
    @Span()
    async emiteResultadoEmpatePartida(jogador1: string, jogador2: string) {
        try {
            const jogador1Id = await this._cacheService.get(jogador1.toString());
            const jogador2Id = await this._cacheService.get(jogador2.toString());
            this.server.to([jogador1Id.toString(), jogador2Id.toString()]).emit('partidaFinalizada', 'game-draw');
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }

    @Span()
    @SubscribeMessage('emojiEnviado')
    async escutaEmoji(@MessageBody() data: any) {
        try {
            this._logger.log("emoji acionado", { data: JSON.stringify(data) });

            const { partida } = await this._partidaService.buscaPartidaPorJogador({ id_jogador: data.jogadorId });

            const idJogador1 = await this._cacheService.get(partida.jogador1_id.toString());
            const idJogador2 = await this._cacheService.get(partida.jogador2_id.toString());

            this.server.to([idJogador1.toString(), idJogador2.toString()]).emit('emojiEmitido', await data);
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }

    @Span()
    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const idJogador = client.handshake.query.jogadorId.toString();

            if (!idJogador)
                return

            await this._cacheService.set(idJogador, client.id)
            this.server.to(client.id).emit('partidaModificada', await this._partidaService.buscaPartidaPorJogador({ id_jogador: idJogador }));

            this._logger.log("cliente conectado", { client_id: client.id, jogador_id: idJogador });
        }
        catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }

    @Span()
    async handleDisconnect(client: any) {
        try {
            const idJogador = client.handshake.query.jogadorId.toString();
            this._logger.log("cliente desconectado", { client_id: client.id });
            await this._cacheService.del(idJogador);

        } catch (exception) {
            this._logger.error("gateway error", { ...exception })
        }
    }

    @Span()
    afterInit(server: Server) {
        this._logger.log("gateway inicializado");
    }
}