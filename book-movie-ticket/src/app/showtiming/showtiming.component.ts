import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { BookTicket } from 'src/model/BookTicket';

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
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.dates = this.appService.generateDates();
  };
  switchView() {
    this.backtoTheatreList.emit();
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
    if (this.theatre.booked_seats && this.theatre.booked_seats.length) {
      this.checkForBookedSeats();
    }
    this.openModal = true;
  }
  checkForBookedSeats() {
    let bookedSeats = '';
    let bookedDateArr = this.theatre.booked_seats.filter((x: any) => x.date == this.ticketDetails.date);
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
