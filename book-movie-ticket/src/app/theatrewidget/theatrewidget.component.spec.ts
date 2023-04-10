import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatrewidgetComponent } from './theatrewidget.component';

describe('TheatrewidgetComponent', () => {
  let component: TheatrewidgetComponent;
  let fixture: ComponentFixture<TheatrewidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatrewidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatrewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
