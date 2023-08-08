import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RipristinaCredenzialiComponent } from './ripristina-credenziali.component';

describe('RipristinaCredenzialiComponent', () => {
  let component: RipristinaCredenzialiComponent;
  let fixture: ComponentFixture<RipristinaCredenzialiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RipristinaCredenzialiComponent]
    });
    fixture = TestBed.createComponent(RipristinaCredenzialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
