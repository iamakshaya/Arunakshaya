import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit {
  allDetails: any = {};
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.getAllDetails();
  }
  getAllDetails() {
    this.appService.getAllDetails().subscribe((response: any) => {
      if (response) {
        this.allDetails = response;
        this.appService.allDetails.next(response);
        console.log(response);
      }
    }, (err: any) => {
      console.log(err);
    })
  }
}
