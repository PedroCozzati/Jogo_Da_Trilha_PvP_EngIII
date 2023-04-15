import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class Carousel03Component implements OnInit {

  slides: any[] = new Array(3).fill({src:"",title:""});



  ngOnInit() {
    this.slides[0] = {
      src:"../../assets/r1.png",
      title:`
      Peças - 18 peças sendo 9 vermelhas e 9 azuis.
      O tabuleiro possui 24 casas interligados horizontalmente e verticalmente.
      Objetivo - Deixar o adversário com 2 peças no tabuleiro ou deixá-lo sem movimentos.




      `
    };
    this.slides[1] = {
      src:"",
      title:`
      Cada jogador coloca um peça alternando entre jogadores, caso um dos jogadores forme uma linha horizontal ou vertical com três peças (um moinho), ele terá o direito de remover uma peça de seu adversário do tabuleiro.
     


     
      `
    }
    this.slides[2] = {
      src:"",
      title:`
      Após todos colocarem suas nove peças em jogo, eles movem suas peças ao longo de uma das linhas do tabuleiro para uma outra casa adjacente. 
      


      `
    }
  }

}