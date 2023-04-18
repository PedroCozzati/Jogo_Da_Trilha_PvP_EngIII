import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';

@Component({
  selector: 'adm-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css','./adm-page.component.scss']
})
export class AdmPageComponent implements OnInit{
  IssuesList: any = [];
  issueForm: FormGroup;

  ngOnInit() {
  }

  constructor(
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    ) {}

    backButton(){
      this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
    }
  
    exitButton(){
      this.ngZone.run(() => this.router.navigateByUrl('/app-login'));
    }



  openTabuleiroMenu(){
    this.ngZone.run(() => this.router.navigateByUrl('/tabuleiros'));
  }

  openPecasMenu(){
    this.ngZone.run(() => this.router.navigateByUrl('/pecas'));
  }

  openNiveisMenu(){
    this.ngZone.run(() => this.router.navigateByUrl('/niveis'));
  }


  submitForm() {
    alert("TEST")
   
    this.bugService.CreateBug(this.issueForm.value).subscribe((res) => {
      console.log('Issue added!');
      this.ngZone.run(() =>  window.location.reload());
    });
  }


}
