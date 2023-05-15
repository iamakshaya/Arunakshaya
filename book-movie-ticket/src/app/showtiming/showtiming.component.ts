import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { BookTicket } from 'src/model/BookTicket';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showtiming',
  templateUrl: './showtiming.component.html',
  styleUrls: ['./showtiming.component.less']
})
export class ShowtimingComponent implements OnInit {
  @Input() theatre: any;
  @Output() backtoTheatreList = new EventEmitter<any>();
  dates: any = [];
  openModal: boolean = false;
  ticketDetails: BookTicket = new BookTicket();
  bookedSeats: string = "";
  theatreId: string = '';
  date: string = '';
  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.dates = this.appService.generateDates();
    this.selectDate(0);
    this.activatedRoute.params.subscribe((data: any) => {
      if (data['tid']) {
        this.theatreId = data['tid'];
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
      console.log('showtiming');
      console.log(x);
      if (this.theatreId && x.theatre) {
        const theatreIndex = x.theatre.findIndex((x: any)=>x.id == this.theatreId);
        x.theatre[theatreIndex] = this.appService.formMovieList(x.theatre[theatreIndex], x.movies);
        this.theatre = x.theatre[theatreIndex];
      }
    })

  };
  switchView() {
    //this.backtoTheatreList.emit();
    this.router.navigateByUrl('/theatres');
  }
  selectDate(i: number) {
    this.dates.forEach((data: any) => {
      data.selected = false;
    })
    this.dates[i].selected = true;
    this.date = this.dates[i].url;
    this.router.navigateByUrl(`theatres/${this.theatreId}?date=${this.dates[i].url}`);
  }
  closeBooking(afterPost: boolean) {
    this.openModal = false;
    if (afterPost) {
      this.switchView();
    }
  }
  routeToBookTicket(movieId: any,show: any) {
    this.router.navigateByUrl(`bookTicket/${movieId}/${this.theatreId}/${this.date}/${show}`);
  }
}
