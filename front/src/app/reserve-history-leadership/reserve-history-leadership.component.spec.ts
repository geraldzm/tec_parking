import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHistoryLeadershipComponent } from './reserve-history-leadership.component'

describe('ReserveHistoryLeadershipComponent', () => {
  let component: ReserveHistoryLeadershipComponent;
  let fixture: ComponentFixture<ReserveHistoryLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveHistoryLeadershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveHistoryLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
