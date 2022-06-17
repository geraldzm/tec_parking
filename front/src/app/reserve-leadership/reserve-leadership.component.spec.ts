import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveLeadershipComponent } from './reserve-leadership.component';

describe('ReserveLeadershipComponent', () => {
  let component: ReserveLeadershipComponent;
  let fixture: ComponentFixture<ReserveLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveLeadershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
