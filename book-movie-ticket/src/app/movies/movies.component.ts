import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit {
  allDetails: any = {};
  selectedMovieDetails: any = {};
  showAllTimings: boolean = false;
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.getAllDetails();
    this.appService.allDetails.subscribe((data: any) => {
      if (data.isAfterBooking) {
        this.allDetails = data;
      }
    });
  }
  getAllDetails() {
    this.appService.getAllDetails().subscribe((response: any) => {
      if (response) {
        this.allDetails = response;
        this.appService.allDetails.next(response);
      }
    }, (err: any) => {
      console.log(err);
    })
  }
  setCurrentMovieDetails(data: any) {
    this.selectedMovieDetails = data;
    this.showAllTimings = true;
  }
  viewMovieList() {
    this.showAllTimings = false;
  }
}
