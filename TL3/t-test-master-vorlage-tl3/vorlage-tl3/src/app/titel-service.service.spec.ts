import { TestBed } from '@angular/core/testing';

import { TitelServiceService } from './titel-service.service';

describe('TitelServiceService', () => {
  let service: TitelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
