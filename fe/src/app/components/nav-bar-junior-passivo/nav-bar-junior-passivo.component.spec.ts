import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarJuniorPassivoComponent } from './nav-bar-junior-passivo.component';

describe('NavBarJuniorPassivoComponent', () => {
  let component: NavBarJuniorPassivoComponent;
  let fixture: ComponentFixture<NavBarJuniorPassivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarJuniorPassivoComponent]
    });
    fixture = TestBed.createComponent(NavBarJuniorPassivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
