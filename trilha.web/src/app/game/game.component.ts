import { Component, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { ModalService } from '../_modal';
import { Jogador } from '../shared/services/jogador';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fadeAnimation } from './animations';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { AppService } from '../shared/services/app.service';

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
  jogador: any = {};
  nivel: any = {}
  nivelPeca: any = {}
  avatar: string
  teste: Map<string, string>
  pecaSelecionada: any;
  userInfos: any = {};
  infoTitle: string;
  playerStone: any = '';
  gameSides: any = []


  matrixString: string;

  constructor(
    private appService: AppService,
    private webSocket: WebSocketTrilhaService,
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


  tabuleiro: any = this.appService.gameInfo.tabuleiro

  async getTabuleiro() {
    this.webSocket.partidaModificada$.subscribe(data => {
      this.deselectStone()
      data.tabuleiro.forEach(async (coordenadas, index) => {
        await new Promise((resolve) => setTimeout(resolve, 200))
        this.tabuleiro[index] = coordenadas.filter(coordenada => coordenada)
      });
    })
  }



  async ngOnInit() {

    if (this.state == "closed") {
      setTimeout(() => this.state = "wided")
    }

    this.gameSides = ['.stoneBlack', '.stoneWhite']
    var random = Math.floor(Math.random() * this.gameSides.length);
    this.playerStone = this.gameSides[random]
    this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
    this.jogador = this.appService.userInfos;
    this.nivel = this.appService.gameInfo;
    this.nivelPeca = this.appService.gameInfo.peca;
    this.avatar = this.appService.avatar;//this.route.snapshot.params['image'];
    this.avatar = this.appService.avatar;//this.route.snapshot.params['image'];

    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    await this.getTabuleiro()
  }

  ngAfterViewInit() {
    // you'll get your through 'elements' below code
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

  verificaPecaRemovida(coordenada: any[], indexJogador: number) {

    // var isMill = true;

    // if (isMill) {
    //   alert(this.pecaSelecionada.coordenada[0])
    // return coordenada.forEach((ponto, index) => {
    //   this.pecaSelecionada?.coordenada.splice(0,1)
    // })
    // }
    // else
    // if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
    // this.deselectStone();
    // var hasAnyMill = true
    // if(hasAnyMill){
    //   this.infoTitle="Você formou um moinho! - Selecione uma peça do seu adversário para removê-la"
    //   if(this.pecaSelecionada){
    //    return true

    //   }
    // }
    // }
  }

  verificaSelecaoPeca(coordenada: any[], indexJogador: number) {
    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return true
    }
  }


  isNotPrimeiraFase() {


    return this.tabuleiro.map(coordenadasPorJogador => {

      return coordenadasPorJogador.every(coordenada => Math.abs(coordenada.at(0)) !== 4)

    });

  }



  stoneClick(coordenada: any[], indexJogador: number) {
    if (!this.isNotPrimeiraFase().every(Boolean)) {
      if (Math.abs(coordenada.at(0)) !== 4) {
        this.infoTitle = "Você ainda não posicionou todas as suas peças!"
        setTimeout(() => {
          this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
        }, 1500);
        return
      }

    }

    this.pecaSelecionada = { indexJogador, coordenada }

  }


  movePeca(coordenada: any) {

    if (!this.validaMovimentacao(this.pecaSelecionada?.coordenada, coordenada))
      return

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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  closeModalGame(id: string) {
    var item = {
      url: `login-authenticated/${JSON.stringify(this.jogador)}`
    };

    this.ngZone.run(() => this.router.navigateByUrl(item.url));
  }

  corLadoA = 'red'
  corLadoB = 'blue'

  isPlaying = true
  showInfo = true

  stoneStyle = ''

  // selectStone(){
  //   style={}
  // }


}

