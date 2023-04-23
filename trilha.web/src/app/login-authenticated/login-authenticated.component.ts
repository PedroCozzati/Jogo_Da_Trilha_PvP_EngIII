import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BugService } from '../shared/services/bug.service';

@Component({
  selector: 'app-login-authenticated',
  templateUrl: './login-authenticated.component.html',
  styleUrls: ['./login-authenticated.component.css'],
})
export class LoginAuthenticatedComponent {
  issueForm: FormGroup;
  IssueArr: any = [];
  public user: string;

  slides: any[] = new Array(3).fill({title:""});

  div1:boolean=true;
  div2:boolean=false;


  ngOnInit() {
    this.div1=true;
    this.div2=false;
      this.user = this.route.snapshot.params['user']; 
      console.log(this.route.snapshot.params['user']);

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
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }



  div1Function() {
    console.log("FUNCAO CHAMDA")

    this.div1=false 

    this.div2=true
  }

  div3Function() {
    console.log("FUNCAO CHAMDA")

    this.div1=true 

    this.div2=false
  }
   
   

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
