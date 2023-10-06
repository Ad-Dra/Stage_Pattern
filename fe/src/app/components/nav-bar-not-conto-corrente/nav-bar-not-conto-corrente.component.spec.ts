import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNotContoCorrenteComponent } from './nav-bar-not-conto-corrente.component';

describe('NavBarNotContoCorrenteComponent', () => {
  let component: NavBarNotContoCorrenteComponent;
  let fixture: ComponentFixture<NavBarNotContoCorrenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarNotContoCorrenteComponent]
    });
    fixture = TestBed.createComponent(NavBarNotContoCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
