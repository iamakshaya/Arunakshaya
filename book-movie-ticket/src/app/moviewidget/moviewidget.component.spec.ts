import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviewidgetComponent } from './moviewidget.component';

describe('MoviewidgetComponent', () => {
  let component: MoviewidgetComponent;
  let fixture: ComponentFixture<MoviewidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviewidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
