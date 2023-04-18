import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoNivelComponent } from './novo-nivel.component';

describe('NovoNivelComponent', () => {
  let component: NovoNivelComponent;
  let fixture: ComponentFixture<NovoNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoNivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
