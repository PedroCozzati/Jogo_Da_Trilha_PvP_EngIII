import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabuleiroComponent } from './tabuleiro.component';

describe('TabuleiroComponent', () => {
  let component: TabuleiroComponent;
  let fixture: ComponentFixture<TabuleiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabuleiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabuleiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
