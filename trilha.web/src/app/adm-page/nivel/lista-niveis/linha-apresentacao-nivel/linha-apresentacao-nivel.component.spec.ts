import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaApresentacaoNivelComponent } from './linha-apresentacao-nivel.component';

describe('LinhaApresentacaoNivelComponent', () => {
  let component: LinhaApresentacaoNivelComponent;
  let fixture: ComponentFixture<LinhaApresentacaoNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhaApresentacaoNivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinhaApresentacaoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
