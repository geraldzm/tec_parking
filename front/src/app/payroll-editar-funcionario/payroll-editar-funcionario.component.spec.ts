import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEditarFuncionarioComponent } from './payroll-editar-funcionario.component';

describe('PayrollEditarFuncionarioComponent', () => {
  let component: PayrollEditarFuncionarioComponent;
  let fixture: ComponentFixture<PayrollEditarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollEditarFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEditarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
