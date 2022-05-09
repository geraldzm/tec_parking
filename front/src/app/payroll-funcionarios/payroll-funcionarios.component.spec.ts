import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollFuncionariosComponent } from './payroll-funcionarios.component';

describe('PayrollFuncionariosComponent', () => {
  let component: PayrollFuncionariosComponent;
  let fixture: ComponentFixture<PayrollFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
