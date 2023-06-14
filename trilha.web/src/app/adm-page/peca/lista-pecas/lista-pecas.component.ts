import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from 'src/app/shared/services/bug.service';

@Component({
  selector: 'app-lista-pecas',
  templateUrl: './lista-pecas.component.html',
  styleUrls: ['../../adm-page.component.css','../../adm-page.component.scss']
})
export class ListaPecasComponent {
  constructor(
    private http: HttpClient,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.consultaPecas()
  }

   backButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
  }

  exitButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/app-login'));
  }


 


  consultaPecas() {
    this.http.get("http://15.229.11.82:90/peca", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.pecas = response
      })
  }

  pecas: any = []

  deletaPeca(peca: any) {
    this.http.delete(`http://15.229.11.82:90/peca/${peca._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaPecas()
      })
  }
}
