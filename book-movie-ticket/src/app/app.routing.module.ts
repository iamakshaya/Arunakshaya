import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TheatrelistComponent } from './theatrelist/theatrelist.component';
import { ShowtimingComponent } from './showtiming/showtiming.component';
import { TshowtimingComponent } from './tshowtiming/tshowtiming.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { NotfounComponent } from 'src/notfoun/notfoun.component';
import { CreateaccountComponent } from 'src/createaccount/createaccount.component';
import { RouteGuard } from 'src/route.guard';

const routes: Routes = [
  { path: '', component: CreateaccountComponent, canActivate: [RouteGuard] },
  { path: 'createaccount/:id', component: CreateaccountComponent, canActivate: [RouteGuard]},
  { path: 'movies', component: MoviesComponent, canActivate: [RouteGuard]},
  { path: 'movies/:mid', component: TshowtimingComponent, canActivate: [RouteGuard] },
  { path: 'theatres', component: TheatrelistComponent, canActivate: [RouteGuard] },
  { path: 'theatres/:tid', component: ShowtimingComponent, canActivate: [RouteGuard] },
  { path: 'bookTicket/:mid/:tid/:date/:time', component: BookticketComponent, canActivate: [RouteGuard] },
  { path: '**', component: NotfounComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }