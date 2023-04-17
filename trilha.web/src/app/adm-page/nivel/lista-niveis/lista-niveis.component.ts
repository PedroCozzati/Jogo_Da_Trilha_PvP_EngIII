import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-lista-niveis',
  templateUrl: './lista-niveis.component.html',
  styleUrls: ['./lista-niveis.component.css']
})
export class ListaNiveisComponent {
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.consultaNiveis()
  }

  consultaNiveis() {
    this.http.get("http://localhost:90/nivel", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.niveis = response
      })
  }

  niveis: any = []

  deletaNivel(nivel: any) {
    this.http.delete(`http://localhost:90/nivel/${nivel._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaNiveis()
      })
  }
}
