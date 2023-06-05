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

@Component({
  selector: 'app-selecionar-nivel',
  templateUrl: './selecionar-nivel.component.html',
  styleUrls: ['./selecionar-nivel.component.css', './selecionar-nivel.component.scss']
})
export class SelecionarNivelComponent implements OnInit {
  slides: any[] = new Array(3).fill({ src: "", title: "" });

  public user: string;
  saldo: string;

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

  jogador: Jogador;
  appService1:any
  avatar: any
  nivelPeca: any;

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }



  constructor(
    private websocketService: WebSocketTrilhaService,
    private appService: AppService,
    private modalService: ModalService,
    private http: HttpClient,
    public bugService: BugService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }


  tabuleiro: any = {}


  objectTab: any = {
    tabs: []
  }

  item: any

  tabsSorted: any = []

  tabuleiros: any = []
  peca: any = {}
  random: any
  random2: any
  @Input() nivel: any = {}

  @Output()
  nivelDeletado = new EventEmitter<string>();



  deletaNivel(nivel: any) {
    this.http.delete(`http://localhost:90/nivel/${nivel._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivelDeletado.emit()
      })
  }

  registraPartida() {
    this.http.post(`http://localhost:90/partida`,
      {
        jogador_id: this.appService.userInfos._id,
        nivel_id: this.selectedNivelId,
      },
      { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivelDeletado.emit()
      })
  }



  consultaTabuleiroPorId(nivel: any) {


    // this.tabuleiros.push(this.tabuleiro);
  }

  // this.http.get(`http://localhost:90/tabuleiro/643d8198e01fe1cfdaca03d4`, { headers: { "Content-Type": 'application/json' } })
  //   .subscribe(response => {
  //     this.tabuleiro = response
  //     this.tabuleiros.push(this.tabuleiro);

  //     console.log(this.tabuleiros[0].cor);
  //   })


  consultaPecaPorId(nivel: any) {
    this.http.get(`http://localhost:90/peca/${nivel.peca_id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.peca = response
      })
  }

  ngOnInit() {
    this.appService1=this.appService

    alert(this.appService.userInfos.nome)
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

    this.user = this.route.snapshot.params['user'];
    this.saldo = this.route.snapshot.params['saldo'];
    console.log(this.route.snapshot.params['user']);

   

    this.avatar = this.route.snapshot.params['image']




    this.consultaNiveis()

    this.consultaTabuleiroPorId(this.nivel)
    this.consultaPecaPorId(this.nivel)

    this.consultaPeca(this.nivel.peca_id)



    this.slides[0] = {
      src: "",
      title: `
      FACIL
      `
    };

    this.slides[1] = {
      src: "",
      title: `
      MEDIO
      `
    }




    this.slides[2] = {
      src: "",
      title: `
      (1ª FASE) Cada jogador coloca uma peça alternando entre jogadores, caso um dos
        jogadores forme uma linha horizontal ou vertical com três peças (um moinho), ele terá o direito de remover
          uma peça de seu adversário do tabuleiro.
     
      `
    }
    this.slides[3] = {
      src: "",
      title: `
      Após todos colocarem suas nove peças em jogo, eles movem suas peças ao longo de uma das
      linhas do tabuleiro para uma outra casa adjacente.
      `
    }
    this.slides[4] = {
      src: "",
      title: `
      (2ª FASE) Ao completar um "moinho", o jogador terá o direito de remover uma peça de seu adversário, contudo ele não poderá
        remover uma peça do adversário que faz parte de um moinho dele, a não ser que não exista outra peça para
        remover.
      `
    }
    this.slides[5] = {
      src: "",
      title: `
      Extra:
        Se ambos jogadores ficarem com 3 peças em jogo e em 10 jogadas não houver vencedor, o jogo terminará e será
        declarado um empate.
      `
    }
  }





  backButton() {

    this.item = {
      url: `login-authenticated/${JSON.stringify(this.jogador)}`
    };

    this.ngZone.run(() => this.router.navigateByUrl('login-authenticated'));
  }

  consultaPeca(id: string): Promise<any> {
    return this.http.get(`http://localhost:90/peca/${id}`, { headers: { "Content-Type": 'application/json' } }).toPromise().then(response => this.nivelPeca = response)

  }

  getPeca = (id: string) => {
    this.http.get(`http://localhost:90/peca/${id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivelPeca = response
        console.log(response)
      })
  }

  updateBalance(jogador_id: string, saldo: number) {
    this.http.put(`http://localhost:90/jogador/atualiza-saldo/${jogador_id}`, {
      saldo: saldo,
    }, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {

      }, err => {

      })

  }

  selectLevelButton(valorDeAposta: number, nomeNivel: string, corNivel: string, nivel_id: string) {

    this.consultaPeca(nivel_id)

    console.log(this.nivel)

    console.log(nivel_id)

    console.log(this.nivelPeca)

    this.selectedNivelId = nivel_id

    

    var nivel = {
      id: nivel_id,
      nome: nomeNivel,
      corTab: corNivel,
      valorDeAposta: valorDeAposta,
    }

    var item = {
      url: `game`
    };

  
    console.log(valorDeAposta)

    if (this.appService1.userInfos.saldo >= valorDeAposta) {

      this.updateBalance(this.appService1.userInfos._id, -valorDeAposta)
      
      this.appService.gameInfo=nivel

      this.ngZone.run(() => this.router.navigateByUrl('loader'));
      

      // this.websocketService.partidaModificada$.subscribe(data => {
      //   if (data?.jogador2_id) {
      //     this.ngZone.run(() => this.router.navigateByUrl('game'));
      //   }

      //   // data.forEach(async (coordenadas, index) => {
      //   //   await new Promise((resolve) => setTimeout(resolve, 200))
      //   //   this.tabuleiro[index] = coordenadas.filter(coordenada => coordenada)
      //   // });
      // })




    } else {
      this.openModal('selectedLevel')
    }



  }

  test() {

  }
  exitButton() {
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }


  consultaNiveis() {

    try {
      this.http.get("http://localhost:90/nivel", { headers: { "Content-Type": 'application/json' } })
        .subscribe(response => {

          this.niveis = response

          console.log(this.niveis)






          for (let i = 0; i < this.niveis.length; i++) {
            let niv = this.niveis[i]
            this.http.get(`http://localhost:90/tabuleiro/${niv.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
              .subscribe(response => {
                this.div1 = true;
                this.div3 = false;
                this.tabuleiro = response

                this.tabuleiros.sort((a, b) => a._created_at.localeCompare(b._created_at))
                this.tabuleiros.push(this.tabuleiro);


                // this.tabsSorted = this.tabuleiros.sort((a, b) => a._created_at.localeCompare(b._created_at))


                // this.objectTab.tabs = this.tabsSorted


                this.niveis[i].tab = this.tabuleiro


                console.log(this.niveis)

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
