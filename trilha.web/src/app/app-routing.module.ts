import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketTrilha, WebSocketTrilhaService } from './shared/services/websocket-trilha.service';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SocketIoModule,
  ],
  exports: [RouterModule],
  providers: [
    SocketTrilha,
    WebSocketTrilhaService,
  ]
})
export class AppRoutingModule { }
