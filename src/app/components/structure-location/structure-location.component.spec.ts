import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureLocationComponent } from './structure-location.component';

describe('StructureLocationComponent', () => {
  let component: StructureLocationComponent;
  let fixture: ComponentFixture<StructureLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
