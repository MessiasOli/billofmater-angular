import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmaterialComponent } from './formmaterial.component';

describe('FormmaterialComponent', () => {
  let component: FormmaterialComponent;
  let fixture: ComponentFixture<FormmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
