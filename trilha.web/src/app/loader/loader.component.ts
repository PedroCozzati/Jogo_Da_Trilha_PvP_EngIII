import { Component, NgZone } from '@angular/core';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { AppService } from '../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(
    private websocketService: WebSocketTrilhaService,
    private appService: AppService,
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  tips: any = []
  random: any

  // siteData:any
  // gameData:any
  // imageData:any

  sound = new Howl({
    src: ['../../assets/xaropinho-ratinho-rapaz.mp3']
 });


  ngOnInit() {

    // this.sound.play();

    // if(this.appService){
    //   var json =localStorage.getItem('cache')
    //   var jsonImage =localStorage.getItem('cache-image')
    //   var gameImage =localStorage.getItem('cache-game')
    //   this.siteData = JSON.parse(json!)
    //   this.imageData =JSON.parse(jsonImage!)
    //   this.gameData = JSON.parse(gameImage!)
    // }
    // else {
    //  this.imageData = this.appService['avatar']
    //  this.siteData = this.appService
    //  this.gameData =this.appService['gameInfo']
    // }

    // alert(JSON.stringify(this.gameData))

    this.tips = [
      'Posicione a maioria das pedras no centro do tabuleiro, assim há mais chances de ganhar.',
      'Não coloque todas as peças nos cantos pois você pode acabar se bloqueando nas próximas jogadas.',
      'Procure neutralizar as jogadas do seu oponente',
      'Procure deixar uma peça livre para o plano de fuga em caso de trancamento',
      'Aproveite a fase inicial para posicionar as suas peças estrategicamente',
    ]

    this.random = Math.floor(Math.random() * this.tips.length);


   
    var teste ="'AAAAAA':'AAAAAAAAA'"
  

    this.websocketService.partidaModificada$.subscribe(data => {
      // await localStorage.setItem('cache-partida',teste)


      if (data.partida?.jogador2_id) {
        this.appService.gameInfo.tabuleiro = data.tabuleiro;
        this.appService.gameInfo.partida = data.partida;

      // this.gameData = this.appService.gameInfo
      // var test = this.appService.gameInfo.tabuleiro

      // var partida = data.partida
        this.ngZone.run(() => this.router.navigateByUrl('game'));
    
      }
      // alert(JSON.stringify(this.gameData))
    })

    this.registraPartida();
  }

  registraPartida() {
    this.http.post(`http://localhost:90/partida`,
      {
        jogador_id: this.appService.userInfos._id,
        nivel_id: this.appService.gameInfo.nivel_id,
      },
      { headers: { "Content-Type": 'application/json' } })
      .subscribe()
  }
}
