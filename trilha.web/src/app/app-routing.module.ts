import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketTrilha, WebSocketTrilhaService } from './shared/services/websocket-trilha.service';
import { AddIssueComponent } from './pages/page-adm/app/components/add-issue/add-issue.component';
import { EditIssueComponent } from './pages/page-adm/app/components/edit-issue/edit-issue.component';
import { IssueListComponent } from './pages/page-adm/app/components/issue-list/issue-list.component';
import { LoginComponent } from './login/login.component';
import { AdmPageComponent } from './adm-page/adm-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-login' },
  { path: 'add-issue', component: AddIssueComponent },
  { path: 'app-login', component: LoginComponent },
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
