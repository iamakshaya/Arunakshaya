import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatrewidget',
  templateUrl: './theatrewidget.component.html',
  styleUrls: ['./theatrewidget.component.less']
})
export class TheatrewidgetComponent {
  constructor(private router: Router) {}
  @Input() theatre: any;
  @Input() movies: any;
  @Output() setCurrentTheatreDetails = new EventEmitter<any>();
  
  showAllTimings(id: number) {
    this.router.navigateByUrl(`/theatres/${id}`);
    //this.formMovieList();
    //this.setCurrentTheatreDetails.emit(this.theatre);
  }
}
