import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSeniorPassivoComponent } from './nav-bar-senior-passivo.component';

describe('NavBarSeniorPassivoComponent', () => {
  let component: NavBarSeniorPassivoComponent;
  let fixture: ComponentFixture<NavBarSeniorPassivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarSeniorPassivoComponent]
    });
    fixture = TestBed.createComponent(NavBarSeniorPassivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
