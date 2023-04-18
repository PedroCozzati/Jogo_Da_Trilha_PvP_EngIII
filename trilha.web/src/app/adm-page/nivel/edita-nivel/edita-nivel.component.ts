import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edita-nivel',
  templateUrl: './edita-nivel.component.html',
  styleUrls: ['../../adm-page.component.css']
})
export class EditaNivelComponent {
  nivel: any = {}

  tabuleiros: any = []
  pecas: any = []

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.consultaPecas()
    this.consultaTabuleiros()
    this.consultaPeca(this.route.snapshot.paramMap.get('id'))
  }

  consultaPeca(id: any) {
    this.http.get(`http://localhost:90/nivel/${id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.nivel = response
      })
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

  editaNivel(nivel: any) {
    this.http.put(`http://localhost:90/nivel`, nivel, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.ngZone.run(() => this.router.navigateByUrl('/niveis'));
      })
  }
}
