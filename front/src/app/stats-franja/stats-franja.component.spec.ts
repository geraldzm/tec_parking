import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsFranjaComponent } from './stats-franja.component';

describe('StatsFranjaComponent', () => {
  let component: StatsFranjaComponent;
  let fixture: ComponentFixture<StatsFranjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsFranjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsFranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
