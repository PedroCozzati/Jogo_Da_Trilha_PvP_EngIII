import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BugService } from '../shared/services/bug.service';
import { ModalService } from '../_modal';
import { Jogador } from '../shared/services/jogador';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/services/app.service';


@Component({
  selector: 'app-login-authenticated',
  templateUrl: './login-authenticated.component.html',
  styleUrls: ['./login-authenticated.component.css'],
})
export class LoginAuthenticatedComponent {
  issueForm: FormGroup;
  IssueArr: any = [];
  public user: string;
  coinsQtd: number;
  buyCoin: boolean;
  coinBought: boolean;
  userList:  [Jogador];
 
  wins:number;
  position:any=[];
  imgSelected:string;
  avatarImage:string='avatar0';
  selectedImage:string ='../../assets/avatar0.png';
  

  saldo: string;
  ranking: any[] = new Array(10).fill({pos:"",name:"",wins:""})

  shop: any[] = new Array(3).fill({coins:0,price:"",name:""})
  playerObject: Jogador;
  

  div1:boolean=true;
  div2:boolean=false;

  getUserByID() {
    this.http.get<Jogador>(`http://localhost:90/jogador/${this.appService.userInfos._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => { this.playerObject = response });
  }

  getAllUsers() {
    this.http.get<[Jogador]>(`http://localhost:90/jogador`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => { this.userList = response });
  }

  selectImage(){
    this.openModal('avatar')
  }

  ngOnInit() {
    this.imgSelected='../../assets/avatar2.png'

    
    

    this.getAllUsers()
  console.log(this.userList)

    this.buyCoin=true;
    this.coinBought=false;
    this.coinsQtd=0;
    this.div1=true;
    this.div2=false;
      
      

      this.getUserByID()
     

    this.addIssue();
   

    this.shop[0]={
      coins:100,
      price:'R$5,00',
      name:'Pacote básico'
    }
    this.shop[1]={
      coins:300,
      price:'R$10,00',
      name:'Pacote interessante'
    }
    this.shop[2]={
      coins:1000,
      price:'R$25,00',
      name:'Pacote completo'
    }


    

    this.getUserByID()

    
    

  }
  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}


openModalRanking() {



  

  var vitorias: any = [];


  this.userList.forEach(rank => {
    if(rank.vitoria==null){
      rank.vitoria=0
    }
    vitorias.push(rank.vitoria)    

  });

  var sortedArray: Jogador[] = this.userList.sort((n1,n2) => {
    if (n1.vitoria > n2.vitoria) {
        return 1;
    }

    if (n1.vitoria < n2.vitoria) {
        return -1;
    }

    return 0;
});


  var test:any=[2,3,4,5,6,6,6]

  var data = vitorias;
  

  var rank = data.map(function (rank) {
    return function (a, i, aa) {
        return [rank = i + 1];
    };
}(0));

  console.log(data)



  console.log(rank.map(JSON.stringify));


  this.position = rank;

  this.modalService.open('ranking');
}
  

  constructor(
    public appService: AppService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private http: HttpClient,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }



  updateBalance(jogador_id:string,saldo:number){
    this.http.put(`http://localhost:90/jogador/atualiza-saldo/${jogador_id}`, {
      saldo: saldo,
    }, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
       
      }, err => {
      
      })
   
  }


  div1Function() {
    console.log("FUNCAO CHAMDA")

    this.div1=false 

    this.div2=true

    let item;

    

    var image = {
     image:this.selectedImage
    }

  

    item = {
      url: `selecionar-nivel`
    };

    this.appService.avatar = this.avatarImage
  

    this.ngZone.run(() => this.router.navigateByUrl('selecionar-nivel'));


  }


  buyCoins=async (coinQtd:number) => {
    



  




  
    this.updateBalance(
      this.appService.userInfos._id,
      coinQtd,
    )

    this.buyCoin=false;
    this.coinBought=true;
    this.appService.userInfos.saldo =+ this.appService.userInfos.saldo + coinQtd
    
    

    setTimeout (() => {
      this.coinsQtd=coinQtd;
    this.modalService.close('shop');
    this.modalService.open('buy');
    this.buyCoin=true;
    this.coinBought=false;
    },4000);
    

  }

  div3Function() {
    console.log("FUNCAO CHAMDA")

    this.div1=true 

    this.div2=false
  }
   
  slides: any[] = [
    {
      src:"",
      title:`
      O tabuleiro possui 24 casas interligados horizontalmente e verticalmente.
      Nesse jogo há 18 peças, sendo 9 para cada jogador (com cores distintas).
      `
    },
    {
      src:"",
      title:`
      Objetivo - Deixar o adversário com 2 peças no tabuleiro ou deixá-lo sem movimentos.
      O jogo consiste em três partes principais que serão mostradas a seguir
      `
    },
    {
      src:"",
      title:`
      (1ª FASE) Cada jogador coloca uma peça alternando entre jogadores, caso um dos
        jogadores forme uma linha horizontal ou vertical com três peças (um moinho), ele terá o direito de remover
          uma peça de seu adversário do tabuleiro.
     
      `
    },
    {
      src:"",
      title:`
      Após todos colocarem suas nove peças em jogo, eles movem suas peças ao longo de uma das
      linhas do tabuleiro para uma outra casa adjacente.
      `
    },
    {
      src:"",
      title:`
      (2ª FASE) Ao completar um "moinho", o jogador terá o direito de remover uma peça de seu adversário, contudo ele não poderá
        remover uma peça do adversário que faz parte de um moinho dele, a não ser que não exista outra peça para
        remover.
      `
    },
    {
      src:"",
      title:`
      Extra:
        Se ambos jogadores ficarem com 3 peças em jogo e em 10 jogadas não houver vencedor, o jogo terminará e será
        declarado um empate.
      `
    }

  ]


  addIssue() {
    this.issueForm = this.fb.group({
      issue_name: [''],
      issue_message: [''],
    });
  }
  options: AnimationOptions = {
    path: 'https://assets4.lottiefiles.com/packages/lf20_lvftzthk.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  
  options1: AnimationOptions = {
    path: '../../assets/511-money.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };


  submitForm() {
    // if (this.issueForm.value == 'adm') {
      this.bugService.CreateBug(this.issueForm.value).subscribe((res) => {
        console.log('Issue added!');
        this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
      });
    }


    logoutUser() {
      // Futura funcao para deslogar usuario
        
      
   
          this.ngZone.run(() => this.router.navigateByUrl(''));
      
      }
  

}
