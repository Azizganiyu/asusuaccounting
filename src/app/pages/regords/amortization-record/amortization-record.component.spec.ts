import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationRecordComponent } from './amortization-record.component';

describe('AmortizationRecordComponent', () => {
  let component: AmortizationRecordComponent;
  let fixture: ComponentFixture<AmortizationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmortizationRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
