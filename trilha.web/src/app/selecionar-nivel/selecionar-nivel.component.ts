import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BugService } from '../shared/services/bug.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalService } from '../_modal';
import { Jogador } from '../shared/services/jogador';
import { AppService } from '../shared/services/app.service';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-selecionar-nivel',
  templateUrl: './selecionar-nivel.component.html',
  styleUrls: ['./selecionar-nivel.component.css', './selecionar-nivel.component.scss']
})
export class SelecionarNivelComponent implements OnInit {

  options: AnimationOptions = {
    path: "../../assets/select-level.json",
  };

  moneyAnimation: AnimationOptions = {
    path: '../../../assets/511-money.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  niveis: any = []
  div1: boolean;
  div2: boolean;
  div3 = true;
  tips: any = []
  images: any = []
  selectedNivelId: string
  avatar: any
  nivelPeca: any;
  tabuleiro: any = {}
  item: any
  tabsSorted: any = []
  tabuleiros: any = []
  pecas: any = []
  peca: any = {}
  random: any
  random2: any
  randomImages:number
  adImages:any

  sound = new Howl({
    src: ['../../assets/xaropinho-ratinho-rapaz.mp3']
 });


 sound2 = new Howl({
  src: ['../../assets/joga-joga-joga.mp3']
});


  // siteData:any
  // imageData:any

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  constructor(
    private websocketService: WebSocketTrilhaService,
    public appService: AppService,
    private modalService: ModalService,
    private http: HttpClient,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    

    // if(this.appService){
    //   var json =localStorage.getItem('cache')
    //   var jsonImage =localStorage.getItem('cache-image')
    //   this.siteData = JSON.parse(json!)
    //   this.imageData =JSON.parse(jsonImage!)
    // }
    // else {
    //  this.imageData = this.appService['avatar']
    //  this.siteData = this.appService
    // }

    // console.log(this.siteData)
    this.adImages = [
      'anuncio0', 'anuncio1', 'anuncio2', 'anuncio3'
    ]
    this.randomImages = Math.floor(Math.random() * this.adImages.length);

    this.tips = [
      'Posicione a maioria das pedras no centro do tabuleiro, assim há mais chances de ganhar.',
      'Não coloque todas as peças nos cantos pois você pode acabar se bloqueando nas próximas jogadas.',
      'Procure neutralizar as jogadas do seu oponente',
      'Procure deixar uma peça livre para o plano de fuga em caso de trancamento',
      'Aproveite a fase inicial para posicionar as suas peças estrategicamente',
    ]
    this.images = ['draw']
    this.random = Math.floor(Math.random() * this.tips.length);
    this.random2 = Math.floor(Math.random() * this.images.length);
    this.div2 = false

    this.div3 = true
    this.div1 = false

    this.consultaNiveis()

  }

  backButton() {
    this.ngZone.run(() => this.router.navigateByUrl('login-authenticated'));
  }

  updateBalance(jogador_id: string, saldo: number) {
    this.http.put(`http://localhost:90/jogador/atualiza-saldo/${jogador_id}`, {
      saldo: saldo,
    }, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      }, err => {
      })
  }

  selectLevelButton(valorDeAposta: number, nomeNivel: string, corTabuleiro: string, peca: any, nivel_id: string) {
    this.selectedNivelId = nivel_id

    let nivel = {
      id: nivel_id,
      nome: nomeNivel,
      corTab: corTabuleiro,
      peca: peca,
      valorDeAposta: valorDeAposta,
    }

    if (this.appService.userInfos.saldo >= valorDeAposta) {

      this.updateBalance(this.appService.userInfos._id, -valorDeAposta)

      this.appService.gameInfo = nivel

      this.ngZone.run(() => this.router.navigateByUrl('loader'));

    } else {
      this.sound.play();
      this.openModal('selectedLevel')
    }
  }

  exitButton() {
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }

  consultaNiveis() {
    try {
      this.http.get("http://localhost:90/nivel", { headers: { "Content-Type": 'application/json' } })
        .subscribe(response => {
          this.niveis = response
          for (let i = 0; i < this.niveis.length; i++) {
            let niv = this.niveis[i]
            this.http.get(`http://localhost:90/tabuleiro/${niv.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
              .subscribe(response => {
                this.div1 = true
                this.div3 = false
                this.tabuleiro = response
                

                this.tabuleiros.sort((a, b) => a._created_at.localeCompare(b._created_at))
                this.tabuleiros.push(this.tabuleiro);

                this.niveis[i].tab = this.tabuleiro
                console.log(this.tabuleiro)
              },
                (error) => {
                  this.openModal('custom-modal-2');
                })

            this.http.get(`http://localhost:90/peca/${niv.peca_id}`, { headers: { "Content-Type": 'application/json' } })
              .subscribe(response => {
                this.peca = response

                this.pecas.sort((a, b) => a._created_at.localeCompare(b._created_at))
                this.pecas.push(this.peca);

                this.niveis[i].peca = this.peca
              },
                (error) => {
                  this.openModal('custom-modal-2');
                })
          }
        })

    } catch (e) {
      if (e == null) {

        this.openModal('custom-modal-2');
      }
    }
  }

}
