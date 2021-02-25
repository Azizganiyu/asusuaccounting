import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceRecordComponent } from './purchase-invoice-record.component';

describe('PurchaseInvoiceRecordComponent', () => {
  let component: PurchaseInvoiceRecordComponent;
  let fixture: ComponentFixture<PurchaseInvoiceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoiceRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
