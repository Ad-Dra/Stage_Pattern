import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaCancellazioneComponent } from './conferma-cancellazione.component';

describe('ConfermaCancellazioneComponent', () => {
  let component: ConfermaCancellazioneComponent;
  let fixture: ComponentFixture<ConfermaCancellazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfermaCancellazioneComponent]
    });
    fixture = TestBed.createComponent(ConfermaCancellazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
