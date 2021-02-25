import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLogoComponent } from './business-logo.component';

describe('BusinessLogoComponent', () => {
  let component: BusinessLogoComponent;
  let fixture: ComponentFixture<BusinessLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
