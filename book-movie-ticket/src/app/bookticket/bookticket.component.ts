import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookTicket } from 'src/model/BookTicket';
import { AppService } from '../app.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.less']
})
export class BookticketComponent implements OnInit {
  @Input() ticketDetails: BookTicket = new BookTicket();
  @Input() bookedSeats: any = "";
  @Output() closeBooking = new EventEmitter<any>();
  seats = new Array();
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.seats = [];
    let bookedSeatArr = this.bookedSeats ? this.bookedSeats.substring(1, this.bookedSeats.length - 1).split(',') : [];
    for (let i = 1; i <= 100; i++) {
      let isAvailable = bookedSeatArr.length ? !bookedSeatArr.some((x: any) => x == i) : true;
      this.seats.push({ seatNo: i, isAvailable: isAvailable, isSelected: false });
    }
    console.log(this.seats);
  }
  seatsSelected(seatObj: any) {
    seatObj.isSelected = !seatObj.isSelected;
    this.ticketDetails.booked_seats = `[${(this.seats.filter((seatObj: any) => seatObj.isSelected == true)).map((value: any) => value.seatNo)}]`;
    console.log('Tickets Booked');
    console.log(this.ticketDetails);
  }
  close(afterPost: boolean = false) {
    this.ticketDetails.booked_seats = '';
    this.closeBooking.emit(afterPost);
  }
  bookTicket() {
    if (!this.ticketDetails.booked_seats) {
      return;
    }
    this.appService.bookSeats(this.ticketDetails).subscribe((response: any) => {
      if (response && response.message) {
        alert(response.message);
        this.getAllDetails();
        this.close(true);
      }
    }, (err: any) => {
      alert('Booking unsuccessful');
      this.close();
    });
  }

  getAllDetails() {
    this.appService.getAllDetails().subscribe((response: any) => {
      if (response) {
        this.appService.allDetails.next(response);
      }
    }, (err: any) => {
      console.log(err);
    })
  }
}
