import { Component } from '@angular/core';
import { ModalService } from '../_modal';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css','./game.bg.component.css',]
})
export class GameComponent {

  constructor(
    private modalService: ModalService
  ){}

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

  corLadoA = 'red'
  corLadoB ='blue'

  isPlaying = true
  showInfo = true

  stoneStyle =''

  // selectStone(){
  //   style={}
  // }
  

}
