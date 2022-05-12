import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsFuncionarioDetalleComponent } from './stats-funcionario-detalle.component';

describe('StatsFuncionarioDetalleComponent', () => {
  let component: StatsFuncionarioDetalleComponent;
  let fixture: ComponentFixture<StatsFuncionarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsFuncionarioDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsFuncionarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
