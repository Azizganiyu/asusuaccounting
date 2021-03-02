import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryRecordComponent } from './journal-entry-record.component';

describe('JournalEntryRecordComponent', () => {
  let component: JournalEntryRecordComponent;
  let fixture: ComponentFixture<JournalEntryRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalEntryRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
