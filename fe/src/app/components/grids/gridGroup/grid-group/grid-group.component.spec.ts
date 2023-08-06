import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGroupComponent } from './grid-group.component';

describe('GridGroupComponent', () => {
  let component: GridGroupComponent;
  let fixture: ComponentFixture<GridGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
