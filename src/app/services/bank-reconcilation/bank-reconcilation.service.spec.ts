import { TestBed } from '@angular/core/testing';

import { BankReconcilationService } from './bank-reconcilation.service';

describe('BankReconcilationService', () => {
  let service: BankReconcilationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankReconcilationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
