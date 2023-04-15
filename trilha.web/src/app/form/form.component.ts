import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  loginForm: FormGroup;
  IssueArr: any = [];

  ngOnInit() {
    this.addIssue();
  }

  constructor(
  
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }

  options: AnimationOptions = {
    path: '../../assets/lottie.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  
  addIssue() {
    this.loginForm = this.fb.group({
      name: [''],
      senha: [''],
    });

  }

  submitForm() {
    
    console.log(this.loginForm.controls['name'].value=="ADM123");
    
      if(this.loginForm.controls['name'].value=="ADM123"){
        this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
      }
      
  }
  
}

