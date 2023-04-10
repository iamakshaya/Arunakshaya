import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-showtiming',
  templateUrl: './showtiming.component.html',
  styleUrls: ['./showtiming.component.less']
})
export class ShowtimingComponent {
  @Input() theatre: any;
  constructor(private appService: AppService) { }

}
