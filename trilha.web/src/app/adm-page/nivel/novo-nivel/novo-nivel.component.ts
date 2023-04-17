import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-nivel',
  templateUrl: './novo-nivel.component.html',
  styleUrls: ['./novo-nivel.component.css']
})
export class NovoNivelComponent implements OnInit {
  nivel: any = {}

  tabuleiros: any = []
  pecas: any = []

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.consultaPecas()
    this.consultaTabuleiros()
  }

  consultaPecas() {
    this.http.get("http://localhost:90/peca", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.pecas = response
      })
  }

  consultaTabuleiros() {
    this.http.get("http://localhost:90/tabuleiro", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabuleiros = response
      })
  }

  criaNivel(nivel: any) {
    this.http.post(`http://localhost:90/nivel`, nivel, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/niveis'));
      })
  }
}
