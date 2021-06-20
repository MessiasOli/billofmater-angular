import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInputComponent } from './register-input.component';

describe('RegisterInputComponent', () => {
  let component: RegisterInputComponent;
  let fixture: ComponentFixture<RegisterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
