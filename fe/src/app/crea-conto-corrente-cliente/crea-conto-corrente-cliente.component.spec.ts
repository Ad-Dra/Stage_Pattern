import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaContoCorrenteClienteComponent } from './crea-conto-corrente-cliente.component';

describe('CreaContoCorrenteClienteComponent', () => {
  let component: CreaContoCorrenteClienteComponent;
  let fixture: ComponentFixture<CreaContoCorrenteClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaContoCorrenteClienteComponent]
    });
    fixture = TestBed.createComponent(CreaContoCorrenteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
