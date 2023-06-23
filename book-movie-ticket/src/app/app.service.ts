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
  public allDetails = new BehaviorSubject<any>({});
  public getData = this.allDetails.asObservable();
  public allUsers: any = [];
  public isAuthenticated = false;
  public currentUser: any = {};
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
    dates.push({ date: today, displayDate: today.getDate(), displayDay: 'TODAY', selected: true, url: `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}` },
      { date: day_1, displayDate: day_1.getDate(), displayDay: this.days[day_1.getDay()], selected: false, url: `${day_1.getFullYear()}${day_1.getMonth()+1}${day_1.getDate()}` },
      { date: day_2, displayDate: day_2.getDate(), displayDay: this.days[day_2.getDay()], selected: false, url: `${day_2.getFullYear()}${day_2.getMonth()+1}${day_2.getDate()}` },
      { date: day_3, displayDate: day_3.getDate(), displayDay: this.days[day_3.getDay()], selected: false, url: `${day_3.getFullYear()}${day_3.getMonth()+1}${day_3.getDate()}` },
      { date: day_4, displayDate: day_4.getDate(), displayDay: this.days[day_4.getDay()], selected: false, url: `${day_4.getFullYear()}${day_4.getMonth()+1}${day_4.getDate()}` });
    return dates;
  }
  formTheatreList(movie: any, theatres: any) {
    movie.theatres = [];
    theatres.forEach((theatre: any) => {
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
          distinctMovieList.push({movie: movieObj.movie, time: time});     
        }
      });
      theatre.movies = distinctMovieList;
      const theatreObj = theatre.movies.find((movieObj: any) => movieObj.movie == movie.movie_name);
      if (theatreObj) {
        let timeUrl = theatreObj.time.map((x: any) => {return {url: x.replaceAll(':','').replaceAll(' ',''), time: x}});
        movie.theatres.push({theatre: theatre.theatre_name, time: theatreObj.time, ...theatre, id: theatre.id, timeUrl: timeUrl});
      }
    });
    return movie;
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
        const time = otherShows.map((showObj: any) => {return {time: showObj.time, url: showObj.time.replaceAll(':','').replaceAll(' ','')}}); 
        const movieDetails = movies.filter((x: any) => x.movie_name == movieObj.movie)[0];  
        distinctMovieList.push({movie: movieObj.movie, time: time, ...movieDetails});     
      }
    });
    theatre.movies = distinctMovieList;
    console.log(theatre);
    return theatre;
  }
  getAllDetails() {
    let url = 'https://zincubate.in/api/MovieTicketChecker?action=getAllDetails';
    this.http.post(url, { user_mail_id: this.user_mail_id }).subscribe((data: any) => {
      data.movies.forEach((obj: any, i: number) => {
        obj.id = i + 1;
      })
      data.theatre.forEach((obj: any, i: number) => {
        obj.id = i + 1;
      })
      this.allDetails.next(data);
    })
  }
  bookSeats(ticketDetails: BookTicket) {
    let url = "https://zincubate.in/api/MovieTicketChecker?action=bookSeats";
    return this.http.post(url, ticketDetails);
  }


  bookTicket(theatre: any, movie: any, show: string, dates: any) {
    let ticketDetails = new BookTicket();
    let bookedSeats = '';
    let dateSelected = dates.find((obj: any) => obj.selected == true);
    ticketDetails.movie_name = movie.movie_name;
    ticketDetails.date = `${dateSelected.date.getDate()}/${dateSelected.date.getMonth()}/${dateSelected.date.getFullYear()}`;
    ticketDetails.show_time = show;
    ticketDetails.theatre_name = theatre.theatre_name;
    let theatreObj = movie.theatres.find((tobj: any) => tobj.theatre_name == theatre.theatre_name);
    if (theatreObj.booked_seats && theatreObj.booked_seats.length) {
      bookedSeats = this.checkForBookedSeats(theatreObj, ticketDetails);
    }
    return {ticketDetails, bookedSeats};
  }
  checkForBookedSeats(theatreObj: any, ticketDetails: BookTicket) {
    let bookedSeats = '';
    let bookedDateArr = theatreObj.booked_seats.filter((x: any) => x.date == ticketDetails.date);
    if (bookedDateArr.length) {
      let seats = [
        { bookedSeats: bookedDateArr[0].show1_booked_seats, time: bookedDateArr[0].show1_time },
        { bookedSeats: bookedDateArr[0].show2_booked_seats, time: bookedDateArr[0].show2_time },
        { bookedSeats: bookedDateArr[0].show3_booked_seats, time: bookedDateArr[0].show3_time },
        { bookedSeats: bookedDateArr[0].show4_booked_seats, time: bookedDateArr[0].show4_time },
      ];
      bookedSeats = seats.find((x: any) => x.time == ticketDetails.show_time)?.bookedSeats;
    }
    return bookedSeats;
  }
  tbookTicket(theatre: any, movie: any, show: string, dates: any) {
    let ticketDetails = new BookTicket();
    let bookedSeats = '';
    let dateSelected = dates.find((obj: any) => obj.selected == true);
    ticketDetails.movie_name = movie.movie_name;
    ticketDetails.date = `${dateSelected.date.getDate()}/${dateSelected.date.getMonth()}/${dateSelected.date.getFullYear()}`;
    ticketDetails.show_time = show;
    ticketDetails.theatre_name = theatre.theatre_name;
    if (theatre.booked_seats && theatre.booked_seats.length) {
      let bookedSeats = this.tcheckForBookedSeats(theatre, ticketDetails);
    }
    return {ticketDetails, }
  }
  tcheckForBookedSeats(theatre: any, ticketDetails: any) {
    let bookedSeats = '';
    let bookedDateArr = theatre.booked_seats.filter((x: any) => x.date == ticketDetails.date);
    if (bookedDateArr.length) {
      let seats = [
        {bookedSeats : bookedDateArr[0].show1_booked_seats, time: bookedDateArr[0].show1_time},
        {bookedSeats : bookedDateArr[0].show2_booked_seats, time: bookedDateArr[0].show2_time},
        {bookedSeats : bookedDateArr[0].show3_booked_seats, time: bookedDateArr[0].show3_time},
        {bookedSeats : bookedDateArr[0].show4_booked_seats, time: bookedDateArr[0].show4_time},
      ];
      bookedSeats = seats.find((x: any) => x.time == ticketDetails.show_time)?.bookedSeats;
    }
    return bookedSeats;
  }
  updateBookedSeatsByUser(ticketDetails: any) {
    const i = this.allUsers.findIndex((details: any) => details.username.toLowerCase() == this.currentUser.username.toLowerCase());
    if (i != -1) {
      this.allUsers[i].showDetails.push(ticketDetails);
    }
  }
}
