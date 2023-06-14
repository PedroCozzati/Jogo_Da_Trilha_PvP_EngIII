import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNiveisComponent } from './lista-niveis.component';

describe('ListaNiveisComponent', () => {
  let component: ListaNiveisComponent;
  let fixture: ComponentFixture<ListaNiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNiveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
