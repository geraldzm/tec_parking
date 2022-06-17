import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveVisitorComponent } from './reserve-visitor.component';

describe('ReserveVisitorComponent', () => {
  let component: ReserveVisitorComponent;
  let fixture: ComponentFixture<ReserveVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
