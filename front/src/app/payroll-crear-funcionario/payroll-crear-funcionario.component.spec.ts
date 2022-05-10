import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCrearFuncionarioComponent } from './payroll-crear-funcionario.component';

describe('PayrollCrearFuncionarioComponent', () => {
  let component: PayrollCrearFuncionarioComponent;
  let fixture: ComponentFixture<PayrollCrearFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCrearFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCrearFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
