import { TestBed } from '@angular/core/testing';

import { SpecialistGuard } from './specialist.guard';

describe('SpecialistGuard', () => {
  let guard: SpecialistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpecialistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
