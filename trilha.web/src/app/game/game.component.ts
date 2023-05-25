import { Component, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { ModalService } from '../_modal';
import { Jogador } from '../shared/services/jogador';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', './game.bg.component.css',]
})

export class GameComponent {
  jogador: Jogador;
  nivel: any = {}
  nivelPeca: any
  avatar: string
  teste: Map<string, string>
  pecaSelecionada: any;
  infoTitle: string;
  playerStone: any = '';
  gameSides: any = []
  tabuleiro: any = []

  matrixString: string;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService
  ) {
    router.canceledNavigationResolution = 'computed';
  }

  ngOnInit() {

    this.tabuleiro = [
      [
        [-4, 4],
        [-4, 3],
        [-4, 2],
        [-4, 1],
        [-4, 0],
        [-4, -1],
        [-4, -2],
        [-4, -3],
        [-4, -4],
      ],
      [
        [4, 4],
        [4, 3],
        [4, 2],
        [4, 1],
        [4, 0],
        [4, -1],
        [4, -2],
        [4, -3],
        [4, -4],
      ]
    ];

    this.gameSides = ['.stoneBlack', '.stoneWhite']
    var random = Math.floor(Math.random() * this.gameSides.length);
    this.playerStone = this.gameSides[random]
    this.infoTitle = 'Primeira Fase - Posicione suas peças livremente!'
    this.jogador = JSON.parse(this.route.snapshot.params['data']);
    this.nivel = JSON.parse(this.route.snapshot.params['nivel']);
    this.avatar = this.route.snapshot.params['image'];

    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    this.consultaPeca(this.nivel.id)

  }

  ngAfterViewInit() {
    // you'll get your through 'elements' below code
  }

  isError() {
    return false
  }

  consultaPeca(id: string) {
    this.http.get(`http://localhost:90/peca/${id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivelPeca = response
        console.log(response)
      })
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

  verificaSelecaoPeca(coordenada: any[], indexJogador: number) {
    if (coordenada == this.pecaSelecionada?.coordenada && indexJogador == this.pecaSelecionada?.indexJogador) {
      return true
    }
  }

  stoneClick(coordenada: any[], indexJogador: number) {
    this.pecaSelecionada = { indexJogador, coordenada }
  }

  movePeca(coordenada: any) {
    if(!this.validaMovimentacao(this.pecaSelecionada?.coordenada, coordenada))
      return

    coordenada.forEach((ponto, index) => {
      this.pecaSelecionada?.coordenada.splice(index, 1, ponto)
    })

    this.deselectStone();
  }

  validaMovimentacao(origem: any[], destino: any[]) {
    debugger
    if (destino && Math.abs(origem?.at(0)) < 4) {
      if(Math.abs(Math.abs(destino.at(0)) - Math.abs(origem.at(0))) > 1 || Math.abs(Math.abs(destino.at(1)) - Math.abs(origem.at(1))) > 1)
        return false

      return Boolean(Math.abs(Math.abs(origem.at(0)) - Math.abs(destino.at(0)))) !== Boolean(Math.abs(Math.abs(origem.at(1)) - Math.abs(destino.at(1))))
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

  corLadoA = 'red'
  corLadoB = 'blue'

  isPlaying = true
  showInfo = true

  stoneStyle = ''

  // selectStone(){
  //   style={}
  // }


}
