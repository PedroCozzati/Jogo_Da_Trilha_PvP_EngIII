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

  niveis: any = []

  ngOnInit(): void {
    this.consultaNiveis()
  }

  backButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
  }

  exitButton(){
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }
  

  consultaNiveis() {
    this.http.get("http://15.229.11.82:90/nivel", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.niveis = response
      })
  }
}
