import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';
import { AnimationOptions } from 'ngx-lottie';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  loginForm: FormGroup;
  IssueArr: any = [];
  modalRef: MdbModalRef<ModalComponent> | null = null;
  user:string;
  item:any;


  ngOnInit() {
    this.addIssue();
  }

  constructor(
    private modalService: MdbModalService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }

  options: AnimationOptions = {
    path: '../../assets/lottie.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  config = {
    animation:false,
    backdrop: false,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-dialog-centered modal-sm'
  }

   



  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, this.config);
  }

  addIssue() {
    this.loginForm = this.fb.group({
      name: [''],
      senha: [''],
    });

  }

  

  submitForm() {
    if (this.loginForm.controls['name'].value == "useradm" && this.loginForm.controls['senha'].value == "1234") {
      this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
    }

    else if(this.loginForm.controls['name'].value.length != 0 && this.loginForm.controls['senha'].value.length != 0){
      //futura validação de usuario
      this.user=this.loginForm.controls['name'].value;
      this.item = {
        url : `login-authenticated/${this.user}`
      };
    
        this.ngZone.run(() => this.router.navigateByUrl(this.item.url));
    }
    else{
    this.openModal();
    }



  }

}

