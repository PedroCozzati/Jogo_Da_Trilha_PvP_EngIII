import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';
import { AnimationOptions } from 'ngx-lottie';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';


import { ModalService } from '../_modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css','./modal.component.less']
})
export class FormComponent {
  loginForm: FormGroup;
  IssueArr: any = [];
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRef2: MdbModalRef<ModalCadastroComponent> | null = null;
  user:string;
  item:any;

  bodyText: string;
  ngOnInit() {
    this.addIssue(); this.bodyText = 'This text can be updated in modal 1';
  }


  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}


  constructor(
    private modalService: ModalService,
    private modalService2: MdbModalService,
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
    backdrop: true,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
  }

  config2 = {
    animation:false,
    backdrop:true,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
  }

  


  openModalCadastro() {
    this.openModal('cadastro');
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
    this.openModal('custom-modal-1');
    }



  }

}

