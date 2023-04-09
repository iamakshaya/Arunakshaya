import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user_mail_id: string = 'mailarunakshaya@gmail.com';
  allDetails = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) { }

  getAllDetails() {
    let url = 'https://zincubate.in/api/MovieTicketChecker?action=getAllDetails';
    return this.http.post(url, { user_mail_id: this.user_mail_id });
  }
}
