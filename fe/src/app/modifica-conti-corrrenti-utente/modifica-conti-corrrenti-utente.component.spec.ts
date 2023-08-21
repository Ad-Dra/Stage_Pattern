import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaContiCorrrentiUtenteComponent } from './modifica-conti-corrrenti-utente.component';

describe('ModificaContiCorrrentiUtenteComponent', () => {
  let component: ModificaContiCorrrentiUtenteComponent;
  let fixture: ComponentFixture<ModificaContiCorrrentiUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaContiCorrrentiUtenteComponent]
    });
    fixture = TestBed.createComponent(ModificaContiCorrrentiUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
