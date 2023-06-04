import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from 'src/app/shared/services/bug.service';

@Component({
  selector: 'app-lista-tabuleiros',
  templateUrl: './lista-tabuleiros.component.html',
  styleUrls: ['../../adm-page.component.css','../../adm-page.component.scss']
})
export class ListaTabuleirosComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  tabuleiros: any = []
  color: string;

  stylesObj: any;
  
  ngOnInit(): void {
    this.consultaTabuleiros()
  }

  backButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
  }

  exitButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }

  consultaTabuleiros() {
    this.http.get("http://localhost:90/tabuleiro", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.tabuleiros = response
        this.color = response[1].cor;

        for (let i = 0; i < this.tabuleiros; i++) {
          console.log(this.tabuleiros);
        }

        this.stylesObj = {
          'background-color':this.color
        }
      })

 

  }

  

  

  


 

 

  deletaTabuleiro(tabuleiro: any) {
    this.http.delete(`http://localhost:90/tabuleiro/${tabuleiro._id}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.consultaTabuleiros()
      })
  }
}
