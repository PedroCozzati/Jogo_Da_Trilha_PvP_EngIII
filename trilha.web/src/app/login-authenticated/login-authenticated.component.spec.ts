import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthenticatedComponent } from './login-authenticated.component';

describe('LoginAuthenticatedComponent', () => {
  let component: LoginAuthenticatedComponent;
  let fixture: ComponentFixture<LoginAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
