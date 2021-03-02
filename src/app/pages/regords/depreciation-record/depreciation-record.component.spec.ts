import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciationRecordComponent } from './depreciation-record.component';

describe('DepreciationRecordComponent', () => {
  let component: DepreciationRecordComponent;
  let fixture: ComponentFixture<DepreciationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciationRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
