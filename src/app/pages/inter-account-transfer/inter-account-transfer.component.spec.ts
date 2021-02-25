import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAccountTransferComponent } from './inter-account-transfer.component';

describe('InterAccountTransferComponent', () => {
  let component: InterAccountTransferComponent;
  let fixture: ComponentFixture<InterAccountTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterAccountTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterAccountTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
