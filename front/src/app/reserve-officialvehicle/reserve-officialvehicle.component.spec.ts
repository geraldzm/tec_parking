import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ReserveOfficialVehicleComponent} from './reserve-officialvehicle.component'

describe('ReserveComponent', () => {
  let component: ReserveOfficialVehicleComponent;
  let fixture: ComponentFixture<ReserveOfficialVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveOfficialVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveOfficialVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
