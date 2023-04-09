import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { MoviewidgetComponent } from './moviewidget/moviewidget.component';
import { MoviesComponent } from './movies/movies.component';
import { TheatrelistComponent } from './theatrelist/theatrelist.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviewidgetComponent,
    MoviesComponent,
    TheatrelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
