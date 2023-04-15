import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  constructor() {}
  
  @Input() title = 'ENTRAR';
  @Input() height = "40px";
  @Output() onClick ={};
  style = { "height": this.height };

}