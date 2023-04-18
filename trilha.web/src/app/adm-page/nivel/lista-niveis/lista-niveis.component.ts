import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { BugService } from 'src/app/shared/services/bug.service';

@Component({
  selector: 'app-lista-niveis',
  templateUrl: './lista-niveis.component.html',
  styleUrls: ['../../adm-page.component.css','../../adm-page.component.scss']
})
export class ListaNiveisComponent {
  constructor(
    private http: HttpClient,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.consultaNiveis()
    this.consultaTabNamePorId('2')
  }


  backButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
  }

  exitButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/app-login'));
  }

  
  

  tabs:any = []

  consultaNiveis() {
    this.http.get("http://localhost:90/nivel", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.niveis = response
      })

     
  }

  consultaTabNamePorId(nivel: any) {
    this.http.get(`http://localhost:90/tabuleiro/${nivel.tabuleiro_id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabs = response
        console.log(response)
      })

     
  }


  niveis: any = []

  test = this.tabs.tabuleiros;

  deletaNivel(nivel: any) {
    this.http.delete(`http://localhost:90/nivel/${nivel._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaNiveis()
      })
  }
}
