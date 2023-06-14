import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarNivelComponent } from './selecionar-nivel.component';

describe('SelecionarNivelComponent', () => {
  let component: SelecionarNivelComponent;
  let fixture: ComponentFixture<SelecionarNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarNivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
