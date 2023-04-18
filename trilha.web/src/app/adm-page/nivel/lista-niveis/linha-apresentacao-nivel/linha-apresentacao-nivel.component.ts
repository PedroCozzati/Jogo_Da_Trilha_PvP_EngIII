import { HttpClient } from '@angular/common/http';
import { Component, Input, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from 'src/app/shared/services/bug.service';
import { Output, EventEmitter } from '@angular/core'; 


@Component({
  selector: 'app-linha-apresentacao-nivel',
  templateUrl: './linha-apresentacao-nivel.component.html',
  styleUrls: ['./linha-apresentacao-nivel.component.css']
})
export class LinhaApresentacaoNivelComponent {
  constructor(
    private http: HttpClient,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }





  // @Output() someEvent = new EventEmitter<string>();

  // callParent(): void {
  //   this.someEvent.next('somePhone');
  // }



  tabuleiro_nome: string
  peca_nome:string

  ngOnInit(): void {
    this.consultaTabNamePorId('')
  }

  @Input() nivel = {}


  consultaTabNamePorId(nivel: any) {
    this.http.get(`http://localhost:90/tabuleiro/${nivel.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        console.log(response)
      })
  }
  


}
