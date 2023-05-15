import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookTicket } from 'src/model/BookTicket';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tshowtiming',
  templateUrl: './tshowtiming.component.html',
  styleUrls: ['./tshowtiming.component.less']
})
export class TshowtimingComponent {
  @Input() movie: any;
  @Output() backtoMovieList = new EventEmitter<any>();
  dates: any = [];
  movieId: string = '';
  date: string = '';
  openModal: boolean = false;
  ticketDetails: BookTicket = new BookTicket();
  bookedSeats: string = "";
  constructor(public appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.dates = this.appService.generateDates();
    this.selectDate(0);
    this.activatedRoute.params.subscribe((data: any) => {
      if (data['mid']) {
        this.movieId = data['mid'];
      }
   });
   this.activatedRoute.queryParams.subscribe((data: any) => {
    if (data['date']) {
      this.date = data['date'];
      const i = this.dates.findIndex((x: any) => x.url == this.date);
      if (i != -1) {
        this.selectDate(i);
      }
    }
   })
    this.appService.allDetails
    .subscribe((x: any) => {
      console.log('tshowtiming');
      console.log(x);
      if (this.movieId && x.movies) {
        const movieIndex = x.movies.findIndex((x: any)=>x.id == this.movieId);
        x.movies[movieIndex] = this.appService.formTheatreList(x.movies[movieIndex], x.theatre);
        this.movie = x.movies[movieIndex];
      }
    })
  };
  switchView() {
    //this.backtoMovieList.emit();
    this.router.navigateByUrl('/movies');
  }
  selectDate(i: number) {
    this.dates.forEach((data: any) => {
      data.selected = false;
    })
    this.dates[i].selected = true;
    this.date = this.dates[i].url;
    this.router.navigateByUrl(`movies/${this.movieId}?date=${this.dates[i].url}`);
  }

  closeBooking(afterPost: boolean) {
    this.openModal = false;
    if (afterPost) {
      this.switchView();
    }
  }
  routeToBookTicket(theatreId: any,show: any) {
    this.router.navigateByUrl(`bookTicket/${this.movieId}/${theatreId}/${this.date}/${show}`);
  }
}
