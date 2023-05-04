import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaComponent } from './peca.component';

describe('PecaComponent', () => {
  let component: PecaComponent;
  let fixture: ComponentFixture<PecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
