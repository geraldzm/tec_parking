import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEstacionamientosComponent } from './payroll-estacionamientos.component';

describe('PayrollEstacionamientosComponent', () => {
  let component: PayrollEstacionamientosComponent;
  let fixture: ComponentFixture<PayrollEstacionamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollEstacionamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEstacionamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
