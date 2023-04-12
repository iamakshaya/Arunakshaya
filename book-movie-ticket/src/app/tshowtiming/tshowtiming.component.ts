import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookTicket } from 'src/model/BookTicket';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tshowtiming',
  templateUrl: './tshowtiming.component.html',
  styleUrls: ['./tshowtiming.component.less']
})
export class TshowtimingComponent {
@Input() movie: any;
@Output() backtoMovieList = new EventEmitter<any>();
dates: any = [];
  openModal: boolean = false;
  ticketDetails: BookTicket = new BookTicket();
  bookedSeats: string = "";
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.dates = this.appService.generateDates();
  };
  switchView() {
    this.backtoMovieList.emit();
  }
  selectDate(i: number) {
    this.dates.forEach((data: any) => {
      data.selected = false;
    })
    this.dates[i].selected = true;
  }
  bookTicket(theatre: any, movie: any, show: string) {
    let dateSelected = this.dates.find((obj: any) => obj.selected == true);
    this.ticketDetails.movie_name = movie.movie_name;
    this.ticketDetails.date = `${dateSelected.date.getDate()}/${dateSelected.date.getMonth()}/${dateSelected.date.getFullYear()}`;
    this.ticketDetails.show_time = show;
    this.ticketDetails.theatre_name = theatre.theatre_name;
    let theatreObj = this.movie.theatres.find((tobj: any) => tobj.theatre_name == theatre.theatre_name);
    if (theatreObj.booked_seats && theatreObj.booked_seats.length) {
      this.checkForBookedSeats(theatreObj);
    }
    this.openModal = true;
  }
  checkForBookedSeats(theatreObj: any) {
    let bookedSeats = '';
    let bookedDateArr = theatreObj.booked_seats.filter((x: any) => x.date == this.ticketDetails.date);
    if (bookedDateArr.length) {
      let seats = [
        {bookedSeats : bookedDateArr[0].show1_booked_seats, time: bookedDateArr[0].show1_time},
        {bookedSeats : bookedDateArr[0].show2_booked_seats, time: bookedDateArr[0].show2_time},
        {bookedSeats : bookedDateArr[0].show3_booked_seats, time: bookedDateArr[0].show3_time},
        {bookedSeats : bookedDateArr[0].show4_booked_seats, time: bookedDateArr[0].show4_time},
      ];
      bookedSeats = seats.find((x: any) => x.time == this.ticketDetails.show_time)?.bookedSeats;
    }
    this.bookedSeats = bookedSeats;
  }
  closeBooking(afterPost: boolean) {
    this.openModal = false;
    if (afterPost) {
      this.switchView();
    }
  }
}
