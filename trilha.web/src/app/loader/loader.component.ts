import { Component, NgZone } from '@angular/core';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { AppService } from '../shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.tips = [
      'Posicione a maioria das pedras no centro do tabuleiro, assim há mais chances de ganhar.',
      'Não coloque todas as peças nos cantos pois você pode acabar se bloqueando nas próximas jogadas.',
      'Procure neutralizar as jogadas do seu oponente',
      'Procure deixar uma peça livre para o plano de fuga em caso de trancamento',
      'Aproveite a fase inicial para posicionar as suas peças estrategicamente',
    ]

    this.random = Math.floor(Math.random() * this.tips.length);


    this.websocketService.partidaModificada$.subscribe(data => {
      if (data.partida?.jogador2_id) {
        this.websocketService.disconnect();
        this.ngZone.run(() => this.router.navigateByUrl('game'));
      }
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
