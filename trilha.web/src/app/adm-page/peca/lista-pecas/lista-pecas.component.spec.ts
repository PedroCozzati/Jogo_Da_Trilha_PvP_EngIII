import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPecasComponent } from './lista-pecas.component';

describe('ListaPecasComponent', () => {
  let component: ListaPecasComponent;
  let fixture: ComponentFixture<ListaPecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPecasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
