import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'textbox',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  constructor() {}
  
  @Input() title = 'Senha';
  @Input() height = "40px";
  style = { "height": this.height };

}