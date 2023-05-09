import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { BugService } from '../shared/services/bug.service';
import { ModalService } from '../_modal';

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

  ranking: any[] = new Array(10).fill({pos:"",name:"",wins:""})

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




    this.ranking[0]={
      pos:'1',
      name:'Victor',
      wins:'20'
    }
    this.ranking[1]={
      pos:'2',
      name:'TESTE',
      wins:'19'
    }
    this.ranking[2]={
      pos:'3',
      name:'Victor',
      wins:'20'
    }
    this.ranking[3]={
      pos:'4',
      name:'Victor',
      wins:'20'
    }
    this.ranking[4]={
      pos:'5',
      name:'Victor',
      wins:'20'
    }
    this.ranking[5]={
      pos:'6',
      name:'Victor',
      wins:'20'
    }
    this.ranking[6]={
      pos:'7',
      name:'Victor',
      wins:'20'
    }
    this.ranking[7]={
      pos:'8',
      name:'Victor',
      wins:'20'
    }
    this.ranking[8]={
      pos:'9',
      name:'Victor',
      wins:'20'
    }
    this.ranking[9]={
      pos:'10',
      name:'Victor',
      wins:'20'
    }
    

  }
  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

  

  constructor(
    private modalService: ModalService,
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

    let item;

    item = {
      url : `selecionar-nivel/${this.user}/500`
    };
  

    this.ngZone.run(() => this.router.navigateByUrl(item.url));


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


    logoutUser() {
      // Futura funcao para deslogar usuario
        
          this.ngZone.run(() => this.router.navigateByUrl('/app-login'));
      
      }
  

}
