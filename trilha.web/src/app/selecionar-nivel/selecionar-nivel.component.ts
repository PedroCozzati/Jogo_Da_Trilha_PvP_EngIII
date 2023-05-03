import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BugService } from '../shared/services/bug.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-selecionar-nivel',
  templateUrl: './selecionar-nivel.component.html',
  styleUrls: ['./selecionar-nivel.component.css', './selecionar-nivel.component.scss']
})
export class SelecionarNivelComponent implements OnInit {
  slides: any[] = new Array(3).fill({ src: "", title: "" });

  public user:string;

  options: AnimationOptions = {
    path: "../../assets/select-level.json",

  };


  moneyAnimation: AnimationOptions = {
    path: '../../../assets/511-money.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  niveis: any = []
  div1: boolean;
  div2: boolean;
  div3= true;

  

  

  constructor(
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

  @Input() nivel: any = {}

  @Output()
  nivelDeletado = new EventEmitter<string>();

 

  deletaNivel(nivel: any) {
    this.http.delete(`http://localhost:90/nivel/${nivel._id}`, { headers: { "Content-Type": 'application/json' } })
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
  this.div2=false

    this.div3 = true
    this.div1=false 

    this.user = this.route.snapshot.params['user']; 
      console.log(this.route.snapshot.params['user']);

      this.item = {
        url : `login-authenticated/${this.user}`
      };



    this.consultaNiveis()

    this.consultaTabuleiroPorId(this.nivel)
    this.consultaPecaPorId(this.nivel)



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
    this.ngZone.run(() => this.router.navigateByUrl(this.item.url));
  }

  selectLevelButton() {
    this.div1=false;
    this.div3=false;
    this.div2=true;

    
    setTimeout (() => {
      this.ngZone.run(() => this.router.navigateByUrl('game'));
    },2000);

    
   
  }

  test(){
    
  }
  exitButton() {
    this.ngZone.run(() => this.router.navigateByUrl('/app-login'));
  }


  consultaNiveis() {
    this.http.get("http://localhost:90/nivel", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.niveis = response





        for (let i = 0; i < this.niveis.length; i++) {
          let niv = this.niveis[i]
          this.http.get(`http://localhost:90/tabuleiro/${niv.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
            .subscribe(response => {
              this.div1=true;
              this.div3=false;
              this.tabuleiro = response

              this.tabuleiros.sort((a, b) => a._created_at.localeCompare(b._created_at))
              this.tabuleiros.push(this.tabuleiro);


              // this.tabsSorted = this.tabuleiros.sort((a, b) => a._created_at.localeCompare(b._created_at))


              // this.objectTab.tabs = this.tabsSorted


              this.niveis[i].tab = this.tabuleiro


              console.log(this.niveis)

            })
        }
      })

  }

}
