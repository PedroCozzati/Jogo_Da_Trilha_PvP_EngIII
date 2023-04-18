import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPecaComponent } from './nova-peca.component';

describe('NovaPecaComponent', () => {
  let component: NovaPecaComponent;
  let fixture: ComponentFixture<NovaPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaPecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
