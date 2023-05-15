import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theatrelist',
  templateUrl: './theatrelist.component.html',
  styleUrls: ['./theatrelist.component.less']
})
export class TheatrelistComponent implements OnInit {
  allDetails: any = {};
  showAllTimings: boolean = false;
  selectedTheatreDetails: any = {};
  theatreId: number = 0;
  constructor(private appService: AppService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // this.appService.allDetails.subscribe((data: any) => {
    //   this.allDetails = data;
    // });
    this.getAllDetails();
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        this.theatreId = data['id'];
      }
    })
  }
  setCurrentTheatreDetails(data: any) {
    this.selectedTheatreDetails = data;
    this.showAllTimings = true;
  }
  viewTheatreList() {
    this.showAllTimings = false;
  }
  getAllDetails() {
    this.appService.getData.subscribe((response: any) => {
      if (response) {
        this.allDetails = response;
        this.allDetails.theatre.forEach((obj: any, i: number) => {
          obj.id = i + 1;
        })
        //this.appService.allDetails.next(response);
        if (this.theatreId) {
          const theatreIndex = this.allDetails.theatre.findIndex((x: any)=>x.id == this.theatreId);
          this.allDetails.theatre[theatreIndex] = this.formMovieList(this.allDetails.theatre[theatreIndex], this.allDetails.movies);
          this.setCurrentTheatreDetails(this.allDetails.theatre[theatreIndex]);
        }
      }
      console.log(this.allDetails);
    }, (err: any) => {
      console.log(err);
    })
  }
  formMovieList(theatre: any, movies: any) {
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
        const movieDetails = movies.filter((x: any) => x.movie_name == movieObj.movie)[0];  
        distinctMovieList.push({movie: movieObj.movie, time: time, ...movieDetails});     
      }
    });
    theatre.movies = distinctMovieList;
    console.log(theatre);
    return theatre;
  }
}
