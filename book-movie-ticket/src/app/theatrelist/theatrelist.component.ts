import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-theatrelist',
  templateUrl: './theatrelist.component.html',
  styleUrls: ['./theatrelist.component.less']
})
export class TheatrelistComponent implements OnInit {
  allDetails: any = {};
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService.allDetails.subscribe((data: any) => {
      this.allDetails = data;
    });
  }
}
