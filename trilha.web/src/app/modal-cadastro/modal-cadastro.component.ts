import { Component } from '@angular/core';
import { ModalComponent } from '@coreui/angular';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.css','./modal-cadastro.component.scss',]
})
export class ModalCadastroComponent {
  constructor(public modalRef2: MdbModalRef<ModalCadastroComponent>) {}
}
