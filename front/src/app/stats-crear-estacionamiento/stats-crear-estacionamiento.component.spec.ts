import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCrearEstacionamientoComponent } from './stats-crear-estacionamiento.component';

describe('StatsCrearEstacionamientoComponent', () => {
  let component: StatsCrearEstacionamientoComponent;
  let fixture: ComponentFixture<StatsCrearEstacionamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsCrearEstacionamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCrearEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
