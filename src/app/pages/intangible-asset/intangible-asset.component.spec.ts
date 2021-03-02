import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntangibleAssetComponent } from './intangible-asset.component';

describe('IntangibleAssetComponent', () => {
  let component: IntangibleAssetComponent;
  let fixture: ComponentFixture<IntangibleAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntangibleAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntangibleAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
