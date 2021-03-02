import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntangibleAssetAmortizationComponent } from './intangible-asset-amortization.component';

describe('IntangibleAssetAmortizationComponent', () => {
  let component: IntangibleAssetAmortizationComponent;
  let fixture: ComponentFixture<IntangibleAssetAmortizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntangibleAssetAmortizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntangibleAssetAmortizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
