import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAndCurrencyComponent } from './time-and-currency.component';

describe('TimeAndCurrencyComponent', () => {
  let component: TimeAndCurrencyComponent;
  let fixture: ComponentFixture<TimeAndCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeAndCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeAndCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
