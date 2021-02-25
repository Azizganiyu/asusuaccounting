import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalRecordComponent } from './journal-record.component';

describe('JournalRecordComponent', () => {
  let component: JournalRecordComponent;
  let fixture: ComponentFixture<JournalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
