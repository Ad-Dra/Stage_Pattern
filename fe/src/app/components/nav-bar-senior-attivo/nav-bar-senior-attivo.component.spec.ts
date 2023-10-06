import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSeniorAttivoComponent } from './nav-bar-senior-attivo.component';

describe('NavBarSeniorAttivoComponent', () => {
  let component: NavBarSeniorAttivoComponent;
  let fixture: ComponentFixture<NavBarSeniorAttivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarSeniorAttivoComponent]
    });
    fixture = TestBed.createComponent(NavBarSeniorAttivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
