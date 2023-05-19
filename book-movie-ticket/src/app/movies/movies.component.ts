import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit {
  allDetails: any = {};
  selectedMovieDetails: any = {};
  showAllTimings: boolean = false;
  movieId: number = 0;
  constructor(private appService: AppService, private router: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.getAllDetails();
    this.appService.getData.subscribe((data: any) => {
      if (data.isAfterBooking) {
        this.allDetails = data;
      }
    });
    this.router.params.subscribe((data: any) => {
      if (data['id']) {
        this.movieId = data['id'];
      }
    })
  }
  getAllDetails() {
    this.appService.getData.subscribe((response: any) => {
      if (response) {
        this.allDetails = response;
        this.allDetails?.movies?.forEach((obj: any, i: number) => {
          obj.id = i + 1;
        })
        if (this.movieId) {
          const movieIndex = this.allDetails.movies.findIndex((x: any)=>x.id == this.movieId);
          this.allDetails.movies[movieIndex] = this.appService.formTheatreList(this.allDetails.movies[movieIndex], this.allDetails.theatre);
          this.setCurrentMovieDetails(this.allDetails.movies[movieIndex]);
        }
      }
      console.log(this.allDetails);
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
