import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimingComponent } from './showtiming.component';

describe('ShowtimingComponent', () => {
  let component: ShowtimingComponent;
  let fixture: ComponentFixture<ShowtimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
