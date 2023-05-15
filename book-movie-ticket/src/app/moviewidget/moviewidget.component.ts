import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviewidget',
  templateUrl: './moviewidget.component.html',
  styleUrls: ['./moviewidget.component.less']
})
export class MoviewidgetComponent implements OnInit{
  constructor(private router: Router){}
  @Input() movie: any = {};
  @Input() theatres: any = [];
  @Output() setCurrentMovieDetails = new EventEmitter<any>();
  bookTicket() {

  }
  ngOnInit(): void {
  }
  showAllTimings(id: number) {
    this.router.navigateByUrl(`/movies/${id}`);
    // this.formTheatreList();
    // this.setCurrentMovieDetails.emit(this.movie);
  }

  formTheatreList() {
    this.movie.theatres = [];
    this.theatres.forEach((theatre: any) => {
      let movielist = [
        { movie: theatre.show1_movie, time: theatre.show1_time },
        { movie: theatre.show2_movie, time: theatre.show2_time },
        { movie: theatre.show3_movie, time: theatre.show3_time },
        { movie: theatre.show4_movie, time: theatre.show4_time }
      ];
      let distinctMovieList: any = [];
      movielist.forEach((movieObj: any) => {
        if (!distinctMovieList.length || !distinctMovieList.filter((list: any) => list.movie == movieObj.movie).length) {
          const otherShows = movielist.filter((x: any) => x.movie == movieObj.movie);
          const time = otherShows.map((showObj: any) => showObj.time);
          distinctMovieList.push({movie: movieObj.movie, time: time});     
        }
      });
      theatre.movies = distinctMovieList;
      const theatreObj = theatre.movies.find((movieObj: any) => movieObj.movie == this.movie.movie_name);
      if (theatreObj) {
        this.movie.theatres.push({theatre: theatre.theatre_name, time: theatreObj.time, ...theatre});
      }
    });
  }
}
