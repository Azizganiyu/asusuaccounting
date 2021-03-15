import { TestBed } from '@angular/core/testing';

import { PrimaryAccountService } from './primary-account.service';

describe('PrimaryAccountService', () => {
  let service: PrimaryAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
