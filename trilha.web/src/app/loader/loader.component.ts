import { Component } from '@angular/core';
import { WebSocketTrilhaService } from '../shared/services/websocket-trilha.service';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  ngZone: any;
  router: any;

  constructor(
    private websocketService: WebSocketTrilhaService,
    private appService: AppService,
  ){}

  tips: any = []
  random:any

  ngOnInit(){
    this.tips = [
      'Posicione a maioria das pedras no centro do tabuleiro, assim há mais chances de ganhar.',
      'Não coloque todas as peças nos cantos pois você pode acabar se bloqueando nas próximas jogadas.',
      'Procure neutralizar as jogadas do seu oponente',
      'Procure deixar uma peça livre para o plano de fuga em caso de trancamento',
      'Aproveite a fase inicial para posicionar as suas peças estrategicamente',
    ]
    
    this.random = Math.floor(Math.random() * this.tips.length);


    this.websocketService.partidaModificada$.subscribe(data => {
        if (data?.jogador2_id) {
          this.ngZone.run(() => this.router.navigateByUrl('game'));
        }

        // data.forEach(async (coordenadas, index) => {
        //   await new Promise((resolve) => setTimeout(resolve, 200))
        //   this.tabuleiro[index] = coordenadas.filter(coordenada => coordenada)
        // });
      })

   
  }

}
