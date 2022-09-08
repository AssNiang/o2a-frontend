import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppliComponent } from './home-appli.component';

describe('HomeAppliComponent', () => {
  let component: HomeAppliComponent;
  let fixture: ComponentFixture<HomeAppliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAppliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAppliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
