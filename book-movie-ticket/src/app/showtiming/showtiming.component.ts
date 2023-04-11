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
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  dates: any = [];
  openModal: boolean = false;
  ticketDetails: BookTicket = new BookTicket();
  bookedSeats: string = "";
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    let today = new Date();
    let day_1 = new Date();
    day_1.setDate(today.getDate() + 1)
    let day_2 = new Date();
    day_2.setDate(today.getDate() + 2)
    let day_3 = new Date();
    day_3.setDate(today.getDate() + 3)
    let day_4 = new Date();
    day_4.setDate(today.getDate() + 4)
    this.dates.push({ date: today, displayDate: today.getDate(), displayDay: 'TODAY', selected: true },
      { date: day_1, displayDate: day_1.getDate(), displayDay: this.days[day_1.getDay()], selected: false },
      { date: day_2, displayDate: day_2.getDate(), displayDay: this.days[day_2.getDay()], selected: false },
      { date: day_3, displayDate: day_3.getDate(), displayDay: this.days[day_3.getDay()], selected: false },
      { date: day_4, displayDate: day_4.getDate(), displayDay: this.days[day_4.getDay()], selected: false });
    console.log(this.dates);
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
