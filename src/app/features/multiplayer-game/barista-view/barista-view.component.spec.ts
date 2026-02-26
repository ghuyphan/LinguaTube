import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaristaViewComponent } from './barista-view.component';

describe('BaristaViewComponent', () => {
  let component: BaristaViewComponent;
  let fixture: ComponentFixture<BaristaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaristaViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaristaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
