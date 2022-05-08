import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsFuncionariosComponent } from './stats-funcionarios.component';

describe('StatsFuncionariosComponent', () => {
  let component: StatsFuncionariosComponent;
  let fixture: ComponentFixture<StatsFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
