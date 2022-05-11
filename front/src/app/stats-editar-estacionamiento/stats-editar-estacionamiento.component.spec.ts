import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEditarEstacionamientoComponent } from './stats-editar-estacionamiento.component';

describe('StatsEditarEstacionamientoComponent', () => {
  let component: StatsEditarEstacionamientoComponent;
  let fixture: ComponentFixture<StatsEditarEstacionamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsEditarEstacionamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsEditarEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
