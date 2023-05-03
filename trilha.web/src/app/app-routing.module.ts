import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketTrilha, WebSocketTrilhaService } from './shared/services/websocket-trilha.service';
import { AddIssueComponent } from './pages/page-adm/app/components/add-issue/add-issue.component';
import { EditIssueComponent } from './pages/page-adm/app/components/edit-issue/edit-issue.component';
import { IssueListComponent } from './pages/page-adm/app/components/issue-list/issue-list.component';
import { LoginComponent } from './login/login.component';
import { AdmPageComponent } from './adm-page/adm-page.component';
import { EditaTabuleiroComponent } from './adm-page/tabuleiro/edita-tabuleiro/edita-tabuleiro.component';
import { NovoTabuleiroComponent } from './adm-page/tabuleiro/novo-tabuleiro/novo-tabuleiro.component';
import { ListaTabuleirosComponent } from './adm-page/tabuleiro/lista-tabuleiros/lista-tabuleiros.component';
import { ListaPecasComponent } from './adm-page/peca/lista-pecas/lista-pecas.component';
import { NovaPecaComponent } from './adm-page/peca/nova-peca/nova-peca.component';
import { EditaPecaComponent } from './adm-page/peca/edita-peca/edita-peca.component';
import { ListaNiveisComponent } from './adm-page/nivel/lista-niveis/lista-niveis.component';
import { NovoNivelComponent } from './adm-page/nivel/novo-nivel/novo-nivel.component';
import { EditaNivelComponent } from './adm-page/nivel/edita-nivel/edita-nivel.component';
import { GameComponent } from './game/game.component';
import { LoginAuthenticatedComponent } from './login-authenticated/login-authenticated.component';
import { SelecionarNivelComponent } from './selecionar-nivel/selecionar-nivel.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-login' },

  { path: 'tabuleiros', component: ListaTabuleirosComponent },
  { path: 'tabuleiro/novo', component: NovoTabuleiroComponent },
  { path: 'tabuleiro/:id', component: EditaTabuleiroComponent },

  { path: 'pecas', component: ListaPecasComponent },
  { path: 'peca/novo', component: NovaPecaComponent },
  { path: 'peca/:id', component: EditaPecaComponent },

  { path: 'niveis', component: ListaNiveisComponent },
  { path: 'nivel/novo', component: NovoNivelComponent },
  { path: 'nivel/:id', component: EditaNivelComponent },

  { path: 'selecionar-nivel/:user/:nivel', component: SelecionarNivelComponent, },
 
  { path: 'game', component: GameComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'login-authenticated/:user', component: LoginAuthenticatedComponent },
  { path: 'adm-page', component: AdmPageComponent },
  { path: 'edit-issue/:id', component: EditIssueComponent },
  { path: 'issues-list', component: IssueListComponent },
];

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
