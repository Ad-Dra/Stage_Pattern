import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarJuniorAttivoComponent } from './nav-bar-junior-attivo.component';

describe('NavBarJuniorAttivoComponent', () => {
  let component: NavBarJuniorAttivoComponent;
  let fixture: ComponentFixture<NavBarJuniorAttivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarJuniorAttivoComponent]
    });
    fixture = TestBed.createComponent(NavBarJuniorAttivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
