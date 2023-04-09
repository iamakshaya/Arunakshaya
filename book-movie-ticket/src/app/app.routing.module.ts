import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TheatrelistComponent } from './theatrelist/theatrelist.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'theatres', component: TheatrelistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }