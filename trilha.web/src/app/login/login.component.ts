import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  issueForm: FormGroup;
  IssueArr: any = [];

  slides: any[] = new Array(3).fill({title:""});



  ngOnInit() {
    this.addIssue();
    this.slides[0] = {
      title:"teste3"
    };
    this.slides[1] = {
      title:"test356565"
    }
    this.slides[2] = {
      title:"test45346"
    }
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }

  addIssue() {
    this.issueForm = this.fb.group({
      issue_name: [''],
      issue_message: [''],
    });
  }
  options: AnimationOptions = {
    path: 'https://assets4.lottiefiles.com/packages/lf20_lvftzthk.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  

  submitForm() {
    // if (this.issueForm.value == 'adm') {
      this.bugService.CreateBug(this.issueForm.value).subscribe((res) => {
        console.log('Issue added!');
        this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
      });
    }
  

}
