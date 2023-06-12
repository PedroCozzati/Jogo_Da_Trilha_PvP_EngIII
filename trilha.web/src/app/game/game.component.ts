import { Component, ElementRef, HostListener, NgZone, Renderer2 } from '@angular/core';
import { ModalService } from '../_modal';
import { Jogador } from '../shared/services/jogador';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fadeAnimation } from './animations';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { AppService } from '../shared/services/app.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators'
import { Howl } from 'howler';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', './game.bg.component.css',],
  animations: [
    fadeAnimation
  ],
})

export class GameComponent {
  state = "closed";
  jogador1: any = {};
  jogador2: any = {};
  isThePlayer1Active: Boolean;
  isThePlayer2Active: Boolean;
  nivel: any = {}
  nivelPeca: any = {}
  avatar: string
  teste: Map<string, string>
  pecaSelecionada: any;
  userInfos: any = {};
  infoTitle: string;
  playerStone: any = '';
  gameSides: any = []

  isPlayer1Move: boolean

  selectedEmoji: any

  adImages: any[]

  randomImages: any
  showEmoji: boolean
  emojiList: any[]
  emoji: any

  browserRefresh = false;

  sound = new Howl({
    src: ['../../assets/sb_aurora.mp3']
  });

  sound2: string = '../../assets/nossa-tu-eh-ruim.mp3'
  sound3: string = '../../assets/voce-tem-ensino-medio.mp3'
  sound4: string = '../../assets/aff-depois-quer-ser-promovido.mp3'


  loseSounds = [
    this.sound2, this.sound3, this.sound4
  ]

  randomSound = Math.floor(Math.random() * this.loseSounds.length);


  soundLose = new Howl({
    src: [this.loseSounds[this.randomSound]]
  });

  soundDraw = new Howl({
    src: ['../../assets/muito-bom-nota-zero.mp3']
  })

  soundWin = new Howl({
    src: ['../../assets/aee-pensou-hein.mp3']
  })

  sound5 = new Howl({
    src: ['../../assets/joga-joga-joga.mp3']
  });

  matrixString: string;
  subscription: Subscription;
  telaTravadaParaMoinho: string;

  isMoinhoEfetuadoByPlayer1 = () => this.telaTravadaParaMoinho == this.jogador1._id;
  isMoinhoEfetuadoByPlayer2 = () => this.telaTravadaParaMoinho == this.jogador2._id;

  numeroDePecasFora = (index) => this.tabuleiro.at(index).filter(peca => !peca).length

  constructor(
    private webSocket: WebSocketTrilhaService,
    private appService: AppService,
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService
  ) {

    router.canceledNavigationResolution = 'computed';
  }

  sleep(time: any) {
    new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    });
  }

  test() {
    this.ngZone.run(() => this.router.navigateByUrl('selecionar-nivel'))
  }

  tabuleiro: any = this.appService.gameInfo.tabuleiro

  async getTabuleiro() {
    this.webSocket.partidaModificada$.subscribe(data => {
      if(!data.partida)
        return
      this.appService.gameInfo.tabuleiro = data.tabuleiro

      this.telaTravadaParaMoinho = data.partida.aguardandoResolucaoMoinho;

      this.deselectStone()
      data.tabuleiro.forEach(async (coordenadas, index) => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        this.tabuleiro[index] = coordenadas.filter(coordenada => coordenada)
      });

      if (data.partida.versaoPartida.length <= 1) {
        this.isPlayer1Move = true
        return
      }

      this.isPlayer1Move = this.jogador1._id != data.partida.versaoPartida.at(-1)[2]
    })
  }

  async moinhoEfetuado() {
    var info2 = this.infoTitle
    this.webSocket.moinhoEfetuado$.subscribe(data => {
      this.infoTitle = "VOCÊ FEZ UM MOINHO! REMOVA UMA PEÇA DO SEU OPONENTE"
      setTimeout(() => {
        this.infoTitle = info2

      }, 3000);
    })
  }

  async initSocketResultadoPartida() {
    this.webSocket.partidaFinalizada$.subscribe(data => {
      this.openModalEndGame(data);
    })
  }

  async emojiEmitido() {
    this.webSocket.emojiEnviado$.subscribe(data => {
      this.selectedEmoji = data.emoji

      if (this.jogador1._id == data.jogadorId) {
        this.openModal('emoji-click')
        setTimeout(() => {
          this.closeModal('emoji-click')
        }, 1000);
      }


      if (this.jogador2._id == data.jogadorId) {
        this.openModal('emoji-click2')
        setTimeout(() => {
          this.closeModal('emoji-click2')
        }, 1000);
      }
    })
  }

  async getJogadorByID(jogador_id: string) {
    return await lastValueFrom(
      this.http.get(`http://localhost:90/jogador/${jogador_id}`, { headers: { "Content-Type": 'application/json' } })
    )
  }

  openModalEndGame(modal: string) {
    if (modal == 'game-lose') {
      this.soundLose.play()
    }
    if (modal == 'game-draw') {
      this.soundDraw.play()
    }
    if (modal == 'game-win') {
      this.soundWin.play()
    }
    this.modalService.open(modal)
  }

  async ngOnInit() {

    this.sound5.play()

    this.adImages = [
      'anuncio0', 'anuncio1', 'anuncio2', 'anuncio3'
    ]

    this.randomImages = Math.floor(Math.random() * this.adImages.length);

    this.emojiList = [
      '😂', '😭', '😎', '🤬', '😈', '🤡', '💀', '🖕', '🥸'
    ]

    this.jogador1 = await this.getJogadorByID(this.appService.gameInfo.partida.jogador1_id)
    this.jogador2 = await this.getJogadorByID(this.appService.gameInfo.partida.jogador2_id)

    this.isThePlayer1Active = this.appService.userInfos.nome == this.jogador1.nome
    this.isThePlayer2Active = this.appService.userInfos.nome == this.jogador2.nome


    this.gameSides = ['.stoneBlack', '.stoneWhite']
    var random = Math.floor(Math.random() * this.gameSides.length);
    this.playerStone = this.gameSides[random]
    this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'

    this.nivel = this.appService.gameInfo;
    this.nivelPeca = this.appService.gameInfo.peca;
    this.avatar = this.appService.avatar;

    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    this.isPlayer1Move = this.jogador1._id != this.appService.gameInfo.partida.versaoPartida.at(-1)[2]

    await this.getTabuleiro()

    await this.emojiEmitido()

    await this.moinhoEfetuado()

    await this.initSocketResultadoPartida();
  }

  isError() {
    return false
  }

  getMultiplicadorEixoY(coordenada: any[]) {

    if (coordenada[0] == 4 || coordenada[0] == -4) {
      return 7.5
    }
    return 10
  }

  changeOpacity(className) {
    var elems = document.querySelectorAll(className);
    var index = 0, length = elems.length;
    for (; index < length; index++) {
      elems[index].style['box-shadow'] = `0.8vmin 0.4vmin 0.4vmin ${this.nivelPeca.corLadoB}`
    }
  }


  filtraPecasEmJogo(coordenadas: any[]) {
    return coordenadas.filter(coordenada => coordenada)
  }

  verificaSelecaoPeca(coordenada: any[], indexJogador: number) {
    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return true
    }
  }


  pecaBloqueada(coordenada: any[], indexJogador: number) {

    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return false
    }


  }
  async efetuaJogada(jogador_id: string, coordenada_atual: any, coordenada_nova: any, partida_id: string) {
    return await lastValueFrom(
      this.http.put(`http://localhost:90/partida/${partida_id}`, {
        "versaoPartida": [
          coordenada_atual,
          coordenada_nova,
          jogador_id
        ]
      }, { headers: { "Content-Type": 'application/json' } })
    )
  }

  isNotPrimeiraFase() {
    return this.tabuleiro.map(coordenadasPorJogador => {
      return coordenadasPorJogador.every(coordenada => Math.abs(coordenada.at(0)) !== 4)
    });
  }

  async stoneClick(coordenada: any[], indexJogador: number) {
    if (!this.isPlayer1Move && !(this.isPlayer1Move && this.isMoinhoEfetuadoByPlayer2()))
      return;

    const validClickMoinho = !(this.isThePlayer1Active && this.isPlayer1Move) && Math.abs(coordenada.at(0)) !== 4

    if (this.telaTravadaParaMoinho && validClickMoinho) {
      this.pecaSelecionada = { indexJogador, coordenada }
      await this.efetuaJogada(
        this.appService.userInfos._id,
        this.pecaSelecionada?.coordenada,
        null,
        this.appService.gameInfo.partida._id
      )
      return
    }

    if (!this.isNotPrimeiraFase().every(Boolean)) {
      if (Math.abs(coordenada.at(0)) !== 4) {
        this.infoTitle = "As peças ainda não foram posicionadas!"
        setTimeout(() => {
          this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
        }, 2500);
        return
      }
    }

    const validClick = this.isThePlayer1Active && this.isPlayer1Move

    if (validClick) {
      this.pecaSelecionada = { indexJogador, coordenada }
    }
  }

  async stoneClick2(coordenada: any[], indexJogador: number) {
    if (this.isPlayer1Move && !(!this.isPlayer1Move && this.isMoinhoEfetuadoByPlayer1()))
      return;

    const validClickMoinho = !(this.isThePlayer2Active && !this.isPlayer1Move)&& Math.abs(coordenada.at(0)) !== 4

    if (this.telaTravadaParaMoinho && validClickMoinho) {
      this.pecaSelecionada = { indexJogador, coordenada }
      await this.efetuaJogada(
        this.appService.userInfos._id,
        this.pecaSelecionada?.coordenada,
        null,
        this.appService.gameInfo.partida._id
      )
      return
    }

    if (!this.isNotPrimeiraFase().every(Boolean)) {
      if (Math.abs(coordenada.at(0)) !== 4) {
        this.infoTitle = "As peças ainda não foram posicionadas!"
        setTimeout(() => {
          this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
        }, 2500);
        return
      }
    }
    var validClick = this.isThePlayer2Active && !this.isPlayer1Move

    if (validClick) {
      this.pecaSelecionada = { indexJogador, coordenada }
    }
  }
  
  async movePeca(coordenada: any) {
    if (!this.validaMovimentacao(this.pecaSelecionada?.coordenada, coordenada))
      return


    await this.efetuaJogada(
      this.appService.userInfos._id,
      this.pecaSelecionada?.coordenada,
      coordenada,
      this.appService.gameInfo.partida._id
    )
    coordenada.forEach((ponto, index) => {
      this.pecaSelecionada?.coordenada.splice(index, 1, ponto)
    })

    this.deselectStone();
  }

  obtemProfundidade(coordenada: any[]) {
    return Math.abs(Boolean(coordenada.at(0)) ? coordenada.at(0) : coordenada.at(1))
  }

  obtemComprimentoMovimento(origem: any[], destino: any[]) {
    const indexCoordenada = origem.at(0) != destino.at(0) ? 0 : 1
    const diferenca = origem.at(indexCoordenada) + (-destino.at(indexCoordenada))
    return Math.abs(diferenca)
  }

  isMovimentacaoDiagonal(origem: any[], destino: any[]) {
    return (origem.at(0) != destino.at(0)) && (origem.at(1) != destino.at(1))
  }

  isDistanciaCorretaMovimentacao(origem: any[], destino: any[]) {
    const profundidadeOrigem = this.obtemProfundidade(origem)
    const profundidadeDestino = this.obtemProfundidade(destino)

    return this.obtemComprimentoMovimento(origem, destino) === (profundidadeDestino !== profundidadeOrigem ? 1 : profundidadeDestino)
  }

  validaMovimentacao(origem: any[], destino: any[]) {
    if (!origem)
      return false;

    if (this.isThePlayer1Active && !this.isPlayer1Move)
      return false;

    if (this.isThePlayer2Active && this.isPlayer1Move)
      return false;

    if (destino && Math.abs(origem?.at(0)) < 4) {
      this.infoTitle = 'Segunda Fase'

      if (this.isMovimentacaoDiagonal(origem, destino))
        return false

      if (!this.isDistanciaCorretaMovimentacao(origem, destino))
        return false
    }

    return true
  }

  deselectStone() {
    delete this.pecaSelecionada
  }

  openModal(id: string,) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  closeModalGame(id: string) {
    this.ngZone.run(() => this.router.navigateByUrl('login-authenticated'));
  }

  async onEmojiClick(id: string, selectedEmoji: string) {
    this.webSocket.emit({
      jogadorId: this.appService.userInfos._id,
      emoji: selectedEmoji
    }, 'emojiEnviado',)
  }

  corLadoA = 'red'
  corLadoB = 'blue'

  isPlaying = true
  showInfo = true

  stoneStyle = ''
}