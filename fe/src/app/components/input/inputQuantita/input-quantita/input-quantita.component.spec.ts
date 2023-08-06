import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuantitaComponent } from './input-quantita.component';

describe('InputQuantitaComponent', () => {
  let component: InputQuantitaComponent;
  let fixture: ComponentFixture<InputQuantitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputQuantitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuantitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
