import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTabuleiroComponent } from './novo-tabuleiro.component';

describe('NovoTabuleiroComponent', () => {
  let component: NovoTabuleiroComponent;
  let fixture: ComponentFixture<NovoTabuleiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTabuleiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoTabuleiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
