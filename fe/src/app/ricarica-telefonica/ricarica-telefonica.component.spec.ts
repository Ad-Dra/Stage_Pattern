import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicaricaTelefonicaComponent } from './ricarica-telefonica.component';

describe('RicaricaTelefonicaComponent', () => {
  let component: RicaricaTelefonicaComponent;
  let fixture: ComponentFixture<RicaricaTelefonicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicaricaTelefonicaComponent]
    });
    fixture = TestBed.createComponent(RicaricaTelefonicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
