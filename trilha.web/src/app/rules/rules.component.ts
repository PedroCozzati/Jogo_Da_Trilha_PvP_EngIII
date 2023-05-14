import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css','./rules.component.scss']
})
export class Carousel03Component implements OnInit {

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

  options: AnimationOptions = {
    path:"../../assets/rule_animation.json",

  };

  

  ngOnInit() {
    this.slides[0] = {
      src:"",
      title:`
      O tabuleiro possui 24 casas interligados horizontalmente e verticalmente.
      Nesse jogo há 18 peças, sendo 9 para cada jogador (com cores distintas).
      `
    };

    this.slides[1] = {
      src:"",
      title:`
      Objetivo - Deixar o adversário com 2 peças no tabuleiro ou deixá-lo sem movimentos.
      O jogo consiste em três partes principais que serão mostradas a seguir
      `
    }


   
    
    this.slides[2] = {
      src:"",
      title:`
      (1ª FASE) Cada jogador coloca uma peça alternando entre jogadores, caso um dos
        jogadores forme uma linha horizontal ou vertical com três peças (um moinho), ele terá o direito de remover
          uma peça de seu adversário do tabuleiro.
     
      `
    }
    this.slides[3] = {
      src:"",
      title:`
      Após todos colocarem suas nove peças em jogo, eles movem suas peças ao longo de uma das
      linhas do tabuleiro para uma outra casa adjacente.
      `
    }
    this.slides[4] = {
      src:"",
      title:`
      (2ª FASE) Ao completar um "moinho", o jogador terá o direito de remover uma peça de seu adversário, contudo ele não poderá
        remover uma peça do adversário que faz parte de um moinho dele, a não ser que não exista outra peça para
        remover.
      `
    }
    this.slides[5] = {
      src:"",
      title:`
      Extra:
        Se ambos jogadores ficarem com 3 peças em jogo e em 10 jogadas não houver vencedor, o jogo terminará e será
        declarado um empate.
      `
    }
  }

  

}