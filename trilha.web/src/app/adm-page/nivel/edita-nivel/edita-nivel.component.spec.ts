import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaNivelComponent } from './edita-nivel.component';

describe('EditaNivelComponent', () => {
  let component: EditaNivelComponent;
  let fixture: ComponentFixture<EditaNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaNivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
