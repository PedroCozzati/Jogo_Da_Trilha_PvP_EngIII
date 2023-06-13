import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-tabuleiro',
  templateUrl: './novo-tabuleiro.component.html',
  styleUrls: ['../../adm-page.component.css']
})
export class NovoTabuleiroComponent {
  tabuleiro: any = {}

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  criaTabuleiro(tabuleiro: any) {
    this.http.post(`http://15.229.11.82:90/tabuleiro`, tabuleiro, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/tabuleiros'));
      })
  }
}
