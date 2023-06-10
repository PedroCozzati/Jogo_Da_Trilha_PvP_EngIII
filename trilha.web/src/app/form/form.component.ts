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
import { AppService } from '../shared/services/app.service';
import { lastValueFrom } from 'rxjs';

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

 
  loginForm: FormGroup;
  registerForm: FormGroup;
  user: string;
  userExists: boolean;
  userFound: any;

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

  registerUserByEmail:any;

  userFoundRecSenha:any;


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

  async getUserByUsername() {
    return await lastValueFrom(this.http.get(`http://localhost:90/jogador/login`, {
      params: {
        "nome": this.loginForm.controls['name'].value,
        "senha": this.loginForm.controls['senha'].value,
      }
    }))
  }

  async getUserByEmail() {
    return await lastValueFrom(this.http.get(`http://localhost:90/jogador/recuperacao`, {
      params: {
        "email": this.userEmails.controls['primaryEmail'].value
      }
    }))
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

  checkUserByEmail


  ngOnInit() {
    // console.log(localStorage.getItem('cache'))

    this.pwdChanged = false;
    this.canResetPwd = false
    this.tryLogin = false
    this.successLogin = false
    this.errorRegister = false
    this.successRegister = false
    this.usernameAlreadyTaken = false
    this.emailAlreadyTaken = false

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

  }





  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {


    console.log(this.userFound)
    this.clearForm()
    this.modalService.close(id);
  }

  closeModalRecSenha() {
    console.log(this.userFound)
    this.clearForm()
    this.canResetPwd = false;
    this.userEmails2.controls['secundaryEmail'].enable()
    this.pwdChanged = false;

    this.modalService.close('recsenha');
  }

  closeModalCadastro() {
    console.log(this.userFound)
    this.modalService.close('cadastro');
    this.clearForm()

    if (this.successRegister) {
      location.reload();
    }

  }

  async registerUserModal() {
    
    // this.userList = await lastValueFrom(this.http.get(`http://localhost:90/jogador`, { headers: { "Content-Type": 'application/json' } }))
    this.registerUserByEmail = await lastValueFrom(this.http.get(`http://localhost:90/jogador/login`, {
      params: {
        "nome": this.userEmails.controls['nameCadastro'].value,
        "senha": this.userEmails.controls['senhaCadastro'].value,
      }
    }))
    var userByEmail = await lastValueFrom(this.http.get(`http://localhost:90/jogador/recuperacao`, {
      params: {
        "email": this.userEmails.controls['primaryEmail'].value
      }
    
    }))
   
    const now = new Date()

    if (userByEmail!=null) {
      this.emailAlreadyTaken = true;
      setTimeout(() => {
        this.emailAlreadyTaken = false;
      }, 2000);
    }

    else if (this.registerUserByEmail?.nome !=null) {
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

  }


  constructor(
    private appService: AppService,
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

  async submitForm() {
    this.userFound = await lastValueFrom(this.http.get(`http://localhost:90/jogador/login`, {
      params: {
        "nome": this.loginForm.controls['name'].value,
        "senha": this.loginForm.controls['senha'].value,
      }
    }))

    this.successLogin = false;
    this.tryLogin = true
    console.log(this.userFound)

    var isUserFound = this.userFound != null

    if (
      this.loginForm.controls['name'].value == "useradm" && this.loginForm.controls['senha'].value == "1234") {
      this.ngZone.run(() => this.router.navigateByUrl('/adm-page'));
      this.successLogin = false;

    } else {
      if (isUserFound) {
        this.appService.userInfos = this.userFound
        // let key ='cache'
        // localStorage.setItem(key, JSON.stringify(this.appService));
        this.successLogin = true;

        setTimeout(() => {
          this.ngZone.run(() => this.router.navigateByUrl('login-authenticated'));
        }, 3000);
      }
      else {
        this.successLogin = false;
        this.openModal('custom-modal-1');
      }
    }
  }

  async checkUserModal() {
    var userByEmail:any={}
    userByEmail = await lastValueFrom(this.http.get(`http://localhost:90/jogador/recuperacao`, {
      params: {
        "email": this.userEmails2.controls['secundaryEmail'].value
      }
    }))
    this.userFoundRecSenha = userByEmail.nome
    if (userByEmail!=null) {
      this.canResetPwd = true
      this.userEmails2.controls['secundaryEmail'].disable()
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

  async recSenha() {
    var userByEmail:any={}
    userByEmail = await lastValueFrom(this.http.get(`http://localhost:90/jogador/recuperacao`, {
      params: {
        "email": this.userEmails2.controls['secundaryEmail'].value
      }
    }))
    this.canResetPwd = false

   
    console.log(this.userFoundRecSenha)

    this.updatePassword(
      userByEmail._id,
      this.userEmails2.controls['novaSenha'].value,
      userByEmail.nome,
      userByEmail.saldo,
      userByEmail.email,
      userByEmail.dataNasc,
    )

    userByEmail.senha = this.userEmails2.controls['novaSenha'].value

    this.pwdChanged = true;



  }

}

