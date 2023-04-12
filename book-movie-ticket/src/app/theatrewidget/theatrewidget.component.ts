import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-theatrewidget',
  templateUrl: './theatrewidget.component.html',
  styleUrls: ['./theatrewidget.component.less']
})
export class TheatrewidgetComponent {
  @Input() theatre: any;
  @Input() movies: any;
  @Output() setCurrentTheatreDetails = new EventEmitter<any>();
  
  showAllTimings() {
    this.formMovieList();
    this.setCurrentTheatreDetails.emit(this.theatre);
  }

  formMovieList() {
    let movielist = [
      { movie: this.theatre.show1_movie, time: this.theatre.show1_time },
      { movie: this.theatre.show2_movie, time: this.theatre.show2_time },
      { movie: this.theatre.show3_movie, time: this.theatre.show3_time },
      { movie: this.theatre.show4_movie, time: this.theatre.show4_time }
    ];
    let distinctMovieList: any = [];
    movielist.forEach((movieObj: any) => {
      if (!distinctMovieList.length || !distinctMovieList.filter((list: any) => list.movie == movieObj.movie).length) {
        const otherShows = movielist.filter((x: any) => x.movie == movieObj.movie);
        const time = otherShows.map((showObj: any) => showObj.time); 
        const movieDetails = this.movies.filter((x: any) => x.movie_name == movieObj.movie)[0];  
        distinctMovieList.push({movie: movieObj.movie, time: time, ...movieDetails});     
      }
    });
    this.theatre.movies = distinctMovieList;
    console.log(this.theatre);
  }
}
