import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaCreazioneAccountComponent } from './conferma-creazione-account.component';

describe('ConferaCreazioneAccountComponent', () => {
  let component: ConfermaCreazioneAccountComponent;
  let fixture: ComponentFixture<ConfermaCreazioneAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfermaCreazioneAccountComponent]
    });
    fixture = TestBed.createComponent(ConfermaCreazioneAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
