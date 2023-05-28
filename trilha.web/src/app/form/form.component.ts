import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { BugService } from '../shared/services/bug.service';
import { AnimationOptions } from 'ngx-lottie';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';

import { Jogador } from '../shared/services/jogador';


import { ModalService } from '../_modal';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1500, style({ opacity: 0 }))
      ])
    ])
  ],
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', './modal.component.less']
})
export class FormComponent implements OnInit {


  found: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRef2: MdbModalRef<ModalCadastroComponent> | null = null;
  user: string;
  userExists: boolean;
  userList: any = [];
  item: any;
  bodyText: string;
  usernameAlreadyTaken: boolean;
  emailAlreadyTaken: boolean;
  successRegister: boolean;
  errorRegister: boolean;
  userEmails: any
  userEmails2: any
  successLogin: boolean;
  tryLogin: boolean;

  canResetPwd: boolean;
  neverUsedEmail: boolean;
  pwdChanged: boolean;


  clearForm() {

    this.userEmails2.reset();
    this.userEmails.reset();
    this.loginForm.reset();
  }

  get primEmail() {
    return this.userEmails.get('primaryEmail')
  }

  get secEmail() {
    return this.userEmails2.get('secundaryEmail')
  }

  get newPwd() {
    return this.userEmails2.get('novaSenha')
  }

  get userField() {
    return this.userEmails.get('nameCadastro')
  }

  get passwordField() {
    return this.userEmails.get('senhaCadastro')
  }


  getAllUsers() {
    this.http.get(`http://localhost:90/jogador`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => { this.userList = response });
  }

  registerUser(nome: string, email: string, senha: string, saldo: 100, dataNasc: Date, vitorias: 0) {

    this.http.post(`http://localhost:90/jogador`, {
      nome: nome,
      senha: senha,
      saldo: saldo,
      email: email,
      dataNasc: dataNasc,
      vitorias: 1,
    }, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.successRegister = true;
      }, err => {
        this.errorRegister = true;
      })
  }

  updatePassword(jogador_id: string, senha: string, nome: string, saldo: 100, email: string, dataNasc: Date) {
    this.http.put(`http://localhost:90/jogador/${jogador_id}`, {
      nome: nome,
      senha: senha,
      saldo: saldo,
      email: email,
      dataNasc: dataNasc,
    }, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.successRegister = true;
      }, err => {
        this.errorRegister = true;
      })
  }


  ngOnInit() {
    this.pwdChanged = false;
    this.canResetPwd = false
    this.tryLogin = false
    this.successLogin = false
    this.errorRegister = false
    this.successRegister = false
    this.usernameAlreadyTaken = false
    this.emailAlreadyTaken = false


    var now = new Date()



    this.loginForm = this.fb.group({
      name: [''],
      senha: [''],

    });

    this.registerForm = this.fb2.group({
      emailCadastro: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),


    });


    this.userEmails2 = new FormGroup({

      secundaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      novaSenha: new FormControl('', [
        Validators.required,
        Validators.pattern("^.{6,12}$")])
    });

    this.userEmails = new FormGroup({
      nameCadastro: new FormControl('', [
        Validators.required,
      ]),
      primaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      senhaCadastro: new FormControl('', [
        Validators.required,
        Validators.pattern("^.{6,12}$")])
    });


    this.getAllUsers()
    var now = new Date()


    console.log(this.userList)





    this.bodyText = 'This text can be updated in modal 1';
  }





  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {


    console.log(this.userList)
    this.clearForm()
    this.modalService.close(id);
  }

  closeModalRecSenha() {


    console.log(this.userList)
    this.clearForm()
    this.canResetPwd = false;
    this.userEmails2.controls['secundaryEmail'].enable()
    this.pwdChanged = false;

    this.modalService.close('recsenha');
  }

  closeModalCadastro() {


    console.log(this.userList)
    this.modalService.close('cadastro');
    this.clearForm()

    if (this.successRegister) {
      location.reload();
    }

  }

  registerUserModal() {

    const now = new Date()



    if (this.userList.find((obj) => {
      return obj.email == this.userEmails.controls['primaryEmail'].value;
    })) {
      this.emailAlreadyTaken = true;
      setTimeout(() => {
        this.emailAlreadyTaken = false;
      }, 2000);
    }

    else if (this.userList.find((obj) => {
      return obj.nome == this.userEmails.controls['nameCadastro'].value;
    })

    ) {
      this.usernameAlreadyTaken = true;
      setTimeout(() => {
        this.usernameAlreadyTaken = false;
      }, 2000);
    }

    else {
      this.usernameAlreadyTaken = false;
      this.userEmails.controls['primaryEmail'].disable()
      this.registerUser(
        this.userEmails.controls['nameCadastro'].value,
        this.userEmails.controls['primaryEmail'].value,
        this.userEmails.controls['senhaCadastro'].value,
        100,
        now,
        0
      )

    }


    console.log(this.userEmails.controls['primaryEmail'].value)
    console.log(this.userList)

  }


  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private modalService2: MdbModalService,
    public fb: FormBuilder,
    public fb2: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService
  ) { }

  options: AnimationOptions = {
    path: '../../assets/lottie.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  optionsLogin: AnimationOptions = {
    path: '../../assets/login.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };

  config = {
    animation: false,
    backdrop: true,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
  }

  config2 = {
    animation: false,
    backdrop: true,
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








  submitForm() {
    this.successLogin = false;

    this.tryLogin = true


    const user = this.userList.find(({ nome }) => nome == this.loginForm.controls['name'].value)

    var foundUser = this.userList.find((obj) => {
      return obj.nome === this.loginForm.controls['name'].value;
    });


    if (
      this.loginForm.controls['name'].value == "useradm" && this.loginForm.controls['senha'].value == "1234") {
      this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
      this.successLogin = false;

    } else {

      if (foundUser) {

        if (
          foundUser.nome == this.loginForm.controls['name'].value &&
          foundUser.senha == this.loginForm.controls['senha'].value) {
          this.tryLogin = false


          this.user = this.loginForm.controls['name'].value;



          var found = this.userList.find((obj) => {
            return obj.nome === this.user;
          });

          var jogador: Jogador = {
            dataNasc: found.dataNasc,
            _id: found._id,
            nome: this.loginForm.controls['name'].value,
            saldo: found.saldo,
            vitoria: found.vitoria
          }





          var data: Jogador = jogador;

          this.item = {
            url: `login-authenticated/${JSON.stringify(data)}`
          };

          this.successLogin = true;
          setTimeout(() => {
            this.ngZone.run(() => this.router.navigateByUrl(this.item.url));
          }, 3000);

        }



        else if (
          foundUser.nome == this.loginForm.controls['name'].value &&
          foundUser.senha != this.loginForm.controls['senha'].value
        ) {
          this.successLogin = false;

          this.openModal('custom-modal-0')
        }


      }

      else {
        this.successLogin = false;

        this.openModal('custom-modal-1');
      }
    }




  }

  checkUserModal() {
    var foundEmail = this.userList.find(({ email }) => email == this.userEmails2.controls['secundaryEmail'].value)

    this.found = foundEmail.nome;
    if (foundEmail) {
      this.canResetPwd = true
      this.userEmails2.controls['secundaryEmail'].disable()

      // this.user = this.loginForm.controls['name'].value;

      // const found = this.userList.find((obj) => {
      //   return obj.nome === this.user;
      // });
      // this.item = {
      //   url: `login-authenticated/${this.user}/${found.saldo}`
      // };

      // this.successLogin = true;
      // setTimeout (() => {
      //   this.ngZone.run(() => this.router.navigateByUrl(this.item.url));
      // },3000);

    }
    else {
      this.userEmails2.controls['secundaryEmail'].enable()
      this.canResetPwd = false

      this.neverUsedEmail = true

      setTimeout(() => {
        this.neverUsedEmail = false;
      }, 2000);

    }
  }

  recSenha() {

    this.canResetPwd = false


    const found = this.userList.find((obj) => {
      return obj.email === this.userEmails2.controls['secundaryEmail'].value;
    });

    this.updatePassword(
      found._id,
      this.userEmails2.controls['novaSenha'].value,
      found.nome,
      found.saldo,
      found.email,
      found.dataNasc,
    )

    found.senha = this.userEmails2.controls['novaSenha'].value

    this.pwdChanged = true;

    console.log(found)

  }

}

