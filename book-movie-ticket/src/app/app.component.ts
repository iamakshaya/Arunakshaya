import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'book-movie-ticket';
  showhistory = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public appService: AppService) {
    this.appService.getAllDetails();
  }
@HostListener('document:click', ['$event']) public onclick(event: Event) {
  let cEvent: any = event.target;
  if (cEvent.className !== 'side-nav-bar' && cEvent.className !== 'menu-icon') {
    this.hideBookingHistory();
  }
}
  routeTo(key: string) {
    switch(key) {
      case 'signUp' : {
        this.router.navigateByUrl('/createaccount/1');
        break;
      }
      case 'signIn' : {
        this.router.navigateByUrl('/createaccount/2');
        break;
      }
    }
  }

  showBookingHistory() {
    let element: any = document.getElementById('bookingHistory');
    if (element) {
      element.setAttribute('style', 'width:350px');
    }
  }
  hideBookingHistory() {
    let element: any = document.getElementById('bookingHistory');
    if (element) {
      element.setAttribute('style', 'width:0px');
    }
  }
}
