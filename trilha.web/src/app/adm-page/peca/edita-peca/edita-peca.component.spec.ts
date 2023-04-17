import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPecaComponent } from './edita-peca.component';

describe('EditaPecaComponent', () => {
  let component: EditaPecaComponent;
  let fixture: ComponentFixture<EditaPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaPecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
