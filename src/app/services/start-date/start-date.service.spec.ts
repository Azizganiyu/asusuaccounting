import { TestBed } from '@angular/core/testing';

import { StartDateService } from './start-date.service';

describe('StartDateService', () => {
  let service: StartDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
