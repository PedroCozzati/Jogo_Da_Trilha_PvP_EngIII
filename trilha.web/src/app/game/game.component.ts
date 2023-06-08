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

  siteData:any
  imageData:any
  gameData:any
  partidaData:any
  browserRefresh = false;


  matrixString: string;
  subscription: Subscription;
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

  test(){
    this.ngZone.run(() => this.router.navigateByUrl('selecionar-nivel'))
  }
  // @HostListener('unload', ['$event'])
  // async unloadHandler(event) {
  //   await this.ngZone.run(() => this.router.navigateByUrl('selecionar-nivel'))
  // }
 
  

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


  async getJogadorByID(jogador_id: string) {
    return await lastValueFrom(
      this.http.get(`http://localhost:90/jogador/${jogador_id}`, { headers: { "Content-Type": 'application/json' } })
    )
  }


  async ngOnInit() {
    window.onbeforeunload = null
    function unloadPage() {
      alert("unload event detected!");
      return false
      
   }
   

  
  //  function onunload (){ this.test()}
  //   window.onunload =  unloadPage

    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
        
          // Your code here for when the page is refreshd
      }
    })

    // window.addEventListener("beforeunload", function (e) {
    //     var confirmationMessage = "\o/";
    //     console.log("cond");
    //     e.returnValue = void(1);     // Gecko, Trident, Chrome 34+
    //     return null;       // Gecko, WebKit, Chrome <34
    // });

    
    
    if(this.appService){
      var json =await localStorage.getItem('cache')
      var jsonImage =await localStorage.getItem('cache-image')
      var gameImage =localStorage.getItem('cache-game')
      this.siteData = await JSON.parse(json!)
      this.imageData =await JSON.parse(jsonImage!)
      this.gameData = JSON.parse(gameImage!)
    
      console.log(localStorage.getItem('cache-game'))

    }
    else {
     this.imageData = this.appService['avatar']
     this.siteData = this.appService
     this.gameData =this.appService['gameInfo']

    }


    this.jogador1 = await this.getJogadorByID(this.appService.gameInfo.partida.jogador1_id)
    this.jogador2 = await this.getJogadorByID(this.appService.gameInfo.partida.jogador2_id)

    this.isThePlayer1Active = this.siteData.userInfos.nome == this.jogador1.nome
    this.isThePlayer2Active = this.siteData.userInfos.nome == this.jogador2.nome


    this.gameSides = ['.stoneBlack', '.stoneWhite']
    var random = Math.floor(Math.random() * this.gameSides.length);
    this.playerStone = this.gameSides[random]
    this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'

    this.nivel = this.gameData;
    this.nivelPeca = this.gameData.peca;
    this.avatar = this.imageData;//this.route.snapshot.params['image'];
    this.avatar = this.imageData.avatar;//this.route.snapshot.params['image'];

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

    var test = this.siteData.userInfos.nome == this.jogador1.nome
    var test2 = this.siteData.userInfos.nome == this.jogador2.nome
    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return true
    }
    
    
  }


  pecaBloqueada(coordenada: any[], indexJogador: number) {

    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return false
    }
    
    
  }
  async efetuaJogada(jogador_id: string, coordenada_atual: any[], coordenada_nova: any[], partida_id: string) {
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



  stoneClick(coordenada: any[], indexJogador: number) {
    if (!this.isNotPrimeiraFase().every(Boolean)) {
      if (Math.abs(coordenada.at(0)) !== 4) {
        this.infoTitle = "As peças ainda não foram posicionadas!"
        setTimeout(() => {
          this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
        }, 2500);
        return
      }

    }

    var validClick = this.isThePlayer1Active

    if(validClick){
      this.pecaSelecionada = { indexJogador, coordenada }
    }


  }


  stoneClick2(coordenada: any[], indexJogador: number) {
    if (!this.isNotPrimeiraFase().every(Boolean)) {
      if (Math.abs(coordenada.at(0)) !== 4) {
        this.infoTitle = "As peças ainda não foram posicionadas!"
        setTimeout(() => {
          this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
        }, 2500);
        return
      }

    }

    var validClick = this.isThePlayer2Active

    if(validClick){
      this.pecaSelecionada = { indexJogador, coordenada }
    }


  }


  async movePeca(coordenada: any) {
    this.getTabuleiro()
    var a =this.pecaSelecionada?.coordenada.toString()
    var b = a.toString().split(',').map(function(item) {
      return parseInt(item, 10);
  });


    if (!this.validaMovimentacao(this.pecaSelecionada?.coordenada, coordenada))
      return

    coordenada.forEach((ponto, index) => {
      this.pecaSelecionada?.coordenada.splice(index, 1, ponto)
    })

    var c =coordenada.toString()
    var d = c.toString().split(',').map(function(item) {
      return parseInt(item, 10);
  });


    

//   var c = coordenada.split(',').map(function(item) {
//     return parseInt(item, 10);
// });

    console.log(b)
    await this.efetuaJogada(
      this.siteData.userInfos._id,
      b,
      d,
      this.appService.gameInfo.partida._id
    )

    this.getTabuleiro()
    console.log( this.efetuaJogada(
      this.siteData.userInfos._id,
      coordenada,
      this.pecaSelecionada?.coordenada,
      this.appService.gameInfo.partida._id
    ))

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

    this.ngZone.run(() => this.router.navigateByUrl('login-authenticated'));
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

