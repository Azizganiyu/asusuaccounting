import { TestBed } from '@angular/core/testing';

import { AccountInventoryService } from './account-inventory.service';

describe('AccountInventoryService', () => {
  let service: AccountInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
