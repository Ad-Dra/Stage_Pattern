import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHidePswComponent } from './show-hide-psw.component';

describe('ShowHidePswComponent', () => {
  let component: ShowHidePswComponent;
  let fixture: ComponentFixture<ShowHidePswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHidePswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHidePswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
