import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEstacionamientosComponent } from './stats-estacionamientos.component';

describe('StatsEstacionamientosComponent', () => {
  let component: StatsEstacionamientosComponent;
  let fixture: ComponentFixture<StatsEstacionamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsEstacionamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsEstacionamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
