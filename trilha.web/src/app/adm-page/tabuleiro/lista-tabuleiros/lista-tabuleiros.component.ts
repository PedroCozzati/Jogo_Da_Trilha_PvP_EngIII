import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tabuleiros',
  templateUrl: './lista-tabuleiros.component.html',
  styleUrls: ['./lista-tabuleiros.component.css']
})
export class ListaTabuleirosComponent implements OnInit {
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.consultaTabuleiros()
  }

  consultaTabuleiros() {
    this.http.get("http://localhost:90/tabuleiro", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabuleiros = response
      })
  }

  tabuleiros: any = []

  deletaTabuleiro(tabuleiro: any) {
    this.http.delete(`http://localhost:90/tabuleiro/${tabuleiro._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaTabuleiros()
      })
  }
}
