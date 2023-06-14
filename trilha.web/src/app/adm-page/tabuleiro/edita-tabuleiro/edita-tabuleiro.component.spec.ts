import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaTabuleiroComponent } from './edita-tabuleiro.component';

describe('EditaTabuleiroComponent', () => {
  let component: EditaTabuleiroComponent;
  let fixture: ComponentFixture<EditaTabuleiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaTabuleiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaTabuleiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
