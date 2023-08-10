import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentiComponent } from './movimenti.component';

describe('MovimentiComponent', () => {
  let component: MovimentiComponent;
  let fixture: ComponentFixture<MovimentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimentiComponent]
    });
    fixture = TestBed.createComponent(MovimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
