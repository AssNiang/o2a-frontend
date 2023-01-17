import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpecialistComponent } from './create-specialist.component';

describe('CreateSpecialistComponent', () => {
  let component: CreateSpecialistComponent;
  let fixture: ComponentFixture<CreateSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
