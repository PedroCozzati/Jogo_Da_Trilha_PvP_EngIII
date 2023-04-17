import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edita-tabuleiro',
  templateUrl: './edita-tabuleiro.component.html',
  styleUrls: ['./edita-tabuleiro.component.css']
})
export class EditaTabuleiroComponent implements OnInit {
  tabuleiro: any = {}

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.consultaTabuleiro(this.route.snapshot.paramMap.get('id'))
  }

  consultaTabuleiro(id: any) {
    this.http.get(`http://localhost:90/tabuleiro/${id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabuleiro = response
      })
  }

  editaTabuleiro(tabuleiro: any) {
    this.http.put(`http://localhost:90/tabuleiro`, tabuleiro, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/tabuleiros'));
      })
  }
}
