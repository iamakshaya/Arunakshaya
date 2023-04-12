import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BookTicket } from 'src/model/BookTicket';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user_mail_id: string = 'mailarunakshaya@gmail.com';
  allDetails = new BehaviorSubject<any>({});
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  constructor(private http: HttpClient) { }

  generateDates() {
    let dates = [];
    let today = new Date();
    let day_1 = new Date();
    day_1.setDate(today.getDate() + 1)
    let day_2 = new Date();
    day_2.setDate(today.getDate() + 2)
    let day_3 = new Date();
    day_3.setDate(today.getDate() + 3)
    let day_4 = new Date();
    day_4.setDate(today.getDate() + 4)
    dates.push({ date: today, displayDate: today.getDate(), displayDay: 'TODAY', selected: true },
      { date: day_1, displayDate: day_1.getDate(), displayDay: this.days[day_1.getDay()], selected: false },
      { date: day_2, displayDate: day_2.getDate(), displayDay: this.days[day_2.getDay()], selected: false },
      { date: day_3, displayDate: day_3.getDate(), displayDay: this.days[day_3.getDay()], selected: false },
      { date: day_4, displayDate: day_4.getDate(), displayDay: this.days[day_4.getDay()], selected: false });
    return dates;
  }
  getAllDetails() {
    let url = 'https://zincubate.in/api/MovieTicketChecker?action=getAllDetails';
    return this.http.post(url, { user_mail_id: this.user_mail_id });
  }
  bookSeats(ticketDetails: BookTicket) {
    let url = "https://zincubate.in/api/MovieTicketChecker?action=bookSeats";
    return this.http.post(url, ticketDetails);
  }
}
