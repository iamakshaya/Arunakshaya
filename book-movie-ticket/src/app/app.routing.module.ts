import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TheatrelistComponent } from './theatrelist/theatrelist.component';
import { ShowtimingComponent } from './showtiming/showtiming.component';
import { TshowtimingComponent } from './tshowtiming/tshowtiming.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { NotfounComponent } from 'src/notfoun/notfoun.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:mid', component: TshowtimingComponent },
  { path: 'theatres', component: TheatrelistComponent },
  { path: 'theatres/:tid', component: ShowtimingComponent },
  { path: 'bookTicket/:mid/:tid/:date/:time', component: BookticketComponent },
  { path: '**', component: NotfounComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }