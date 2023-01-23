import { TestBed } from '@angular/core/testing';

import { HealthStructService } from './health-struct.service';

describe('HealthStructService', () => {
  let service: HealthStructService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthStructService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
