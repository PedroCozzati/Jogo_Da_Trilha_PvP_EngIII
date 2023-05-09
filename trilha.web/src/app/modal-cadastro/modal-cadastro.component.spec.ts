import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroComponent } from './modal-cadastro.component';

describe('ModalCadastroComponent', () => {
  let component: ModalCadastroComponent;
  let fixture: ComponentFixture<ModalCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
