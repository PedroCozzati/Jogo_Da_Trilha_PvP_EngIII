import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTabuleirosComponent } from './lista-tabuleiros.component';

describe('ListaTabuleirosComponent', () => {
  let component: ListaTabuleirosComponent;
  let fixture: ComponentFixture<ListaTabuleirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTabuleirosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTabuleirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
