import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-pecas',
  templateUrl: './lista-pecas.component.html',
  styleUrls: ['./lista-pecas.component.css']
})
export class ListaPecasComponent {
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.consultaPecas()
  }

  consultaPecas() {
    this.http.get("http://localhost:90/peca", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.pecas = response
      })
  }

  pecas: any = []

  deletaPeca(peca: any) {
    this.http.delete(`http://localhost:90/peca/${peca._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaPecas()
      })
  }
}
