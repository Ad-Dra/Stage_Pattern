import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaUtenzaComponent } from './crea-utenza.component';

describe('CreaUtenzaComponent', () => {
  let component: CreaUtenzaComponent;
  let fixture: ComponentFixture<CreaUtenzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaUtenzaComponent]
    });
    fixture = TestBed.createComponent(CreaUtenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
