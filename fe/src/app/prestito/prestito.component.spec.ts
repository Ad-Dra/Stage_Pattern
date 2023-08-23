import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestitoComponent } from './prestito.component';

describe('PrestitoComponent', () => {
  let component: PrestitoComponent;
  let fixture: ComponentFixture<PrestitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestitoComponent]
    });
    fixture = TestBed.createComponent(PrestitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
