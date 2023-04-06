import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  constructor() {}
  
  @Input() title = 'ENTRAR';
  @Input() height = "40px";
  style = { "height": this.height };

}