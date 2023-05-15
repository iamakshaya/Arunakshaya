import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'book-movie-ticket';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appService: AppService) {
    this.appService.getAllDetails();
  }
}
