import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHistoryVisitorComponent } from './reserve-history-visitor.component'

describe('ReserveHistoryVisitorComponent', () => {
  let component: ReserveHistoryVisitorComponent;
  let fixture: ComponentFixture<ReserveHistoryVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveHistoryVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveHistoryVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
