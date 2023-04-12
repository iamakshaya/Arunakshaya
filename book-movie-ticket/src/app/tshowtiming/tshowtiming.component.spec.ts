import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshowtimingComponent } from './tshowtiming.component';

describe('TshowtimingComponent', () => {
  let component: TshowtimingComponent;
  let fixture: ComponentFixture<TshowtimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TshowtimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TshowtimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
