import { Component } from '@angular/core';
import { WebSocketTrilhaService } from './shared/services/websocket-trilha.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trilha.web';

  novoJogadorRegistrado: any[] = []

  constructor(
    private websocketTrilhaService: WebSocketTrilhaService,
  ) { }

  ngOnInit() {
    this.websocketTrilhaService.novoJogadorRegistrado$.subscribe(data => {
      this.novoJogadorRegistrado.push(data)
    })
  }
}
