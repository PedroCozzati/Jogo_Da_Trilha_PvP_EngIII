import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AnimationOptions } from 'ngx-lottie';
import { ModalComponent } from 'src/app/modal/modal.component';
import { BugService } from 'src/app/shared/services/bug.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  loginForm: FormGroup;
  IssueArr: any = [];
  modalRef: MdbModalRef<ModalComponent> | null = null;
  user: string;
  item: any;


  @Input() title: string;
  @Input() saldo: string;
  @Input() vitorias: number;

  options: AnimationOptions = {
    path: '../../../assets/511-money.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };


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


  @Input() hide:any;
  @Input() styles = {
    'background-img':'url("../../../assets/avatar1.png")'
  };

  @Input() imgSelected = "../../../assets/avatar1.png"
  @Input() selectImage;
  



  div1: boolean = true;

  div1Function() {
    this.div1 = false;
  }


  config = {
    animation: false,
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

    else if (this.loginForm.controls['name'].value.length != 0 && this.loginForm.controls['senha'].value.length != 0) {
      //futura validação de usuario
      this.user = this.loginForm.controls['name'].value;
      this.item = {
        url: `login-authenticated/${this.user}`
      };

      this.ngZone.run(() => this.router.navigateByUrl(this.item.url));
    }
    else {
      this.openModal();
    }



  }
}
