import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './textbox/text.component';
import { LoaderComponent } from './loader/loader.component';
import { FormComponent } from './form/form.component';
import { TabuleiroComponent } from './tabuleiro/tabuleiro.component';
import { PecaComponent } from './peca/peca.component';
import { AddIssueComponent } from './pages/page-adm/app/components/add-issue/add-issue.component';
import { EditIssueComponent } from './pages/page-adm/app/components/edit-issue/edit-issue.component';
import { IssueListComponent } from './pages/page-adm/app/components/issue-list/issue-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BugService } from './shared/services/bug.service';
import { LoginComponent } from './login/login.component';
import { AdmPageComponent } from './adm-page/adm-page.component';
import { Carousel03Component } from './rules/rules.component';
import { SlidesComponent } from './slides/slides.component';
import { CarouselModule } from '@coreui/angular';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';


import { LottieModule } from 'ngx-lottie';
import { NovoTabuleiroComponent } from './adm-page/tabuleiro/novo-tabuleiro/novo-tabuleiro.component';
import { EditaTabuleiroComponent } from './adm-page/tabuleiro/edita-tabuleiro/edita-tabuleiro.component';
import { ListaTabuleirosComponent } from './adm-page/tabuleiro/lista-tabuleiros/lista-tabuleiros.component';
import { ListaPecasComponent } from './adm-page/peca/lista-pecas/lista-pecas.component';
import { EditaPecaComponent } from './adm-page/peca/edita-peca/edita-peca.component';
import { NovaPecaComponent } from './adm-page/peca/nova-peca/nova-peca.component';
import { NovoNivelComponent } from './adm-page/nivel/novo-nivel/novo-nivel.component';
import { EditaNivelComponent } from './adm-page/nivel/edita-nivel/edita-nivel.component';
import { ListaNiveisComponent } from './adm-page/nivel/lista-niveis/lista-niveis.component';
import { LinhaApresentacaoNivelComponent } from './adm-page/nivel/lista-niveis/linha-apresentacao-nivel/linha-apresentacao-nivel.component';

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line


@NgModule({
  declarations: [
    AppComponent,
    AddIssueComponent,
    EditIssueComponent,
    IssueListComponent,
    ButtonComponent,
    TextComponent,
    LoaderComponent,
    FormComponent,
    TabuleiroComponent,
    PecaComponent,
    LoginComponent,
    AdmPageComponent,
    Carousel03Component,
    SlidesComponent,
    NovoTabuleiroComponent,
    EditaTabuleiroComponent,
    ListaTabuleirosComponent,
    ListaPecasComponent,
    EditaPecaComponent,
    NovaPecaComponent,
    NovoNivelComponent,
    EditaNivelComponent,
    ListaNiveisComponent,
    LinhaApresentacaoNivelComponent,
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory}),
   
    MdbCarouselModule,
    CarouselModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [BugService],
  bootstrap: [AppComponent,CarouselModule, Carousel03Component,ButtonComponent,TextComponent, LoaderComponent,FormComponent,TabuleiroComponent,PecaComponent],
})
export class AppModule { }