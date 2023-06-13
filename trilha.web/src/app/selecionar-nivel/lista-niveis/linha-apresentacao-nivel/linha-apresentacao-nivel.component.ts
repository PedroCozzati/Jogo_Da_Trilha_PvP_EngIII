import { HttpClient } from '@angular/common/http';
import { Component, Input, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from 'src/app/shared/services/bug.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'tr[app-linha-apresentacao-nivel]',
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

  tabuleiro: any = {}
  peca: any = {}
  
  @Input() nivel: any = {}

  @Output()
  nivelDeletado = new EventEmitter<string>();

  deletaNivel(nivel: any) {
    this.http.delete(`http://15.229.11.82:90/nivel/${nivel._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivelDeletado.emit()
      })
  }

  ngOnInit(): void {
    this.consultaTabuleiroPorId(this.nivel)
    this.consultaPecaPorId(this.nivel)
  }

  consultaTabuleiroPorId(nivel: any) {
    this.http.get(`http://15.229.11.82:90/tabuleiro/${nivel.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabuleiro = response
      })
  }

  consultaPecaPorId(nivel: any) {
    this.http.get(`http://15.229.11.82:90/peca/${nivel.peca_id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.peca = response
      })
  }
}
