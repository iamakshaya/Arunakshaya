import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookTicket } from 'src/model/BookTicket';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.less']
})
export class BookticketComponent implements OnInit {
  @Input() ticketDetails: BookTicket = new BookTicket();
  @Input() bookedSeats: any = "";
  @Output() closeBooking = new EventEmitter<any>();
  responseMessage = '';
  alert: boolean = false;
  seats = new Array();
  movieId: string = '';
  theatreId: string = '';
  date: string = '';
  time: string = '';
  dates: any = [];
  constructor(private appService: AppService, private activatedRoute:  ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.seats = [];
    this.dates = this.appService.generateDates();
    this.activatedRoute.params.subscribe((data: any) => {
      if (data['mid'] && data['tid'] && data['date'] && data['time']) {
        this.movieId = data['mid'];
        this.theatreId = data['tid'];
        this.date = data['date'];
        this.time = data['time'];
        const i = this.dates.findIndex((x: any) => x.url == this.date);
        if (i != -1) {
          this.selectDate(i);
        }
      }
   });
   this.appService.allDetails.subscribe((x: any) => {
    this.seats = [];
    if (this.movieId && x.movies) {
      const movieIndex = x.movies.findIndex((x: any)=>x.id == this.movieId);
      if(movieIndex != -1) {
        x.movies[movieIndex] = this.appService.formTheatreList(x.movies[movieIndex], x.theatre);
        this.ticketDetails.movie_name = x.movies[movieIndex].movie_name;
        const theatreIndex = x.movies[movieIndex].theatres.findIndex((i: any) => i.id == this.theatreId);
        if (theatreIndex != -1) {
          const show = x.movies[movieIndex].theatres[theatreIndex].timeUrl.filter((t: any) => t.url.toLowerCase() == this.time.toLowerCase());
          if (show.length) {
            let details = {ticketDetails: new BookTicket(), bookedSeats: ''};
            details = this.appService.bookTicket(x.movies[movieIndex].theatres[theatreIndex], x.movies[movieIndex],show[0].time,this.dates);
            this.ticketDetails = details.ticketDetails;
            this.bookedSeats = details.bookedSeats;
            let bookedSeatArr = this.bookedSeats ? this.bookedSeats.substring(1, this.bookedSeats.length - 1).split(',') : [];
            for (let i = 1; i <= 100; i++) {
              let isAvailable = bookedSeatArr.length ? !bookedSeatArr.some((x: any) => x == i) : true;
              this.seats.push({ seatNo: i, isAvailable: isAvailable, isSelected: false });
            }
          }
        }
      }
    }
   })
  }
  seatsSelected(seatObj: any) {
    seatObj.isSelected = !seatObj.isSelected;
    this.ticketDetails.booked_seats = `[${(this.seats.filter((seatObj: any) => seatObj.isSelected == true)).map((value: any) => value.seatNo)}]`;
  }
  close(afterPost: boolean = false) {
    this.ticketDetails.booked_seats = '';
    window.history.back();
  }
  bookTicket() {
    if (!this.ticketDetails.booked_seats) {
      return;
    }
    this.appService.bookSeats(this.ticketDetails).subscribe((response: any) => {
      if (response && response.message) {
        this.responseMessage = response.message;
        this.alert = true;
        this.appService.updateBookedSeatsByUser(this.ticketDetails);
        console.log(this.appService.allUsers);
        this.getAllDetails();
      }
    }, (err: any) => {  
      this.responseMessage = 'Booking unsuccessful';
      this.alert = true;
    });
  }

  getAllDetails() {
    this.appService.getAllDetails();
  }
  selectDate(i: number) {
    this.dates.forEach((data: any) => {
      data.selected = false;
    })
    this.dates[i].selected = true;
    this.date = this.dates[i].url;
  }
}
