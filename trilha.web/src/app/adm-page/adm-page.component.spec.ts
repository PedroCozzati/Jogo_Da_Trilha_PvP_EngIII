import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPageComponent } from './adm-page.component';

describe('AdmPageComponent', () => {
  let component: AdmPageComponent;
  let fixture: ComponentFixture<AdmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
