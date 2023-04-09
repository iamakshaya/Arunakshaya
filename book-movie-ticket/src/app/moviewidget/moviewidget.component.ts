import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moviewidget',
  templateUrl: './moviewidget.component.html',
  styleUrls: ['./moviewidget.component.less']
})
export class MoviewidgetComponent {
  @Input() movie: any = {};

}
