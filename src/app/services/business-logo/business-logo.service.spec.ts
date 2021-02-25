import { TestBed } from '@angular/core/testing';

import { BusinessLogoService } from './business-logo.service';

describe('BusinessLogoService', () => {
  let service: BusinessLogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessLogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
