import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAccountRecordComponent } from './inter-account-record.component';

describe('InterAccountRecordComponent', () => {
  let component: InterAccountRecordComponent;
  let fixture: ComponentFixture<InterAccountRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterAccountRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterAccountRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
