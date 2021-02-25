import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptRecordComponent } from './receipt-record.component';

describe('ReceiptRecordComponent', () => {
  let component: ReceiptRecordComponent;
  let fixture: ComponentFixture<ReceiptRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
