import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHistoryOfficialVehicleComponent } from './reserve-history-officialvehicle.component'

describe('ReserveHistoryOfficialVehicleComponent', () => {
  let component: ReserveHistoryOfficialVehicleComponent;
  let fixture: ComponentFixture<ReserveHistoryOfficialVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveHistoryOfficialVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveHistoryOfficialVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
