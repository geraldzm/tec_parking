import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatOperadorComponent } from './stat-operador.component';

describe('StatOperadorComponent', () => {
  let component: StatOperadorComponent;
  let fixture: ComponentFixture<StatOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatOperadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
