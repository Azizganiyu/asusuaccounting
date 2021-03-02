import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetDepreciationComponent } from './fixed-asset-depreciation.component';

describe('FixedAssetDepreciationComponent', () => {
  let component: FixedAssetDepreciationComponent;
  let fixture: ComponentFixture<FixedAssetDepreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedAssetDepreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
