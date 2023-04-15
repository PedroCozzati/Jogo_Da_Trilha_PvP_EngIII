import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-peca',
  templateUrl: './peca.component.html',
  styleUrls: ['./peca.component.css']
})
export class PecaComponent {


@Input() color = "red";
@Input() posicao = "2";

}
