import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-peca',
  templateUrl: './nova-peca.component.html',
  styleUrls: ['../../adm-page.component.css']
})
export class NovaPecaComponent {
  peca: any = {}

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  criaPeca(peca: any) {
    this.http.post(`http://15.229.11.82:90/peca`, peca, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/pecas'));
      })
  }
}
