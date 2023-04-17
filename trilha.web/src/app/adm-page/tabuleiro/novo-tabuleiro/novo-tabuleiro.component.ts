import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-tabuleiro',
  templateUrl: './novo-tabuleiro.component.html',
  styleUrls: ['./novo-tabuleiro.component.css']
})
export class NovoTabuleiroComponent {
  tabuleiro: any = {}

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  criaTabuleiro(tabuleiro: any) {
    this.http.post(`http://localhost:90/tabuleiro`, tabuleiro, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/tabuleiros'));
      })
  }
}
