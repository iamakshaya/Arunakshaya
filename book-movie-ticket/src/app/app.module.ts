import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { MoviewidgetComponent } from './moviewidget/moviewidget.component';
import { MoviesComponent } from './movies/movies.component';
import { TheatrelistComponent } from './theatrelist/theatrelist.component';
import { TheatrewidgetComponent } from './theatrewidget/theatrewidget.component';
import { ShowtimingComponent } from './showtiming/showtiming.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { TshowtimingComponent } from './tshowtiming/tshowtiming.component';
import { CreateaccountComponent } from 'src/createaccount/createaccount.component';
import { RouteGuard } from 'src/route.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MoviewidgetComponent,
    MoviesComponent,
    TheatrelistComponent,
    TheatrewidgetComponent,
    ShowtimingComponent,
    BookticketComponent,
    TshowtimingComponent,
    CreateaccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ AppService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
