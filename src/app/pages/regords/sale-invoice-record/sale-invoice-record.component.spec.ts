import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleInvoiceRecordComponent } from './sale-invoice-record.component';

describe('SaleInvoiceRecordComponent', () => {
  let component: SaleInvoiceRecordComponent;
  let fixture: ComponentFixture<SaleInvoiceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleInvoiceRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleInvoiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
