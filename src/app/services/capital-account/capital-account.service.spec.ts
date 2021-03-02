import { TestBed } from '@angular/core/testing';

import { CapitalAccountService } from './capital-account.service';

describe('CapitalAccountService', () => {
  let service: CapitalAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
