import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TrendingComponent } from './trending/trending.component';
import { PopularComponent } from './popular/popular.component';
import { TrailersComponent } from './trailers/trailers.component';
import { TvComponent } from './tv/tv.component';
import { MovieComponent } from './movie/movie.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MoviespageComponent } from './moviespage/moviespage.component';
import { TvpageComponent } from './tvpage/tvpage.component';
import { PeoplespageComponent } from './peoplespage/peoplespage.component';
import { PeopleComponent } from './people/people.component';
import { SearchComponent } from './search/search.component';
import { VedioplayerComponent } from './vedioplayer/vedioplayer.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    MoviecardComponent,
    TrendingComponent,
    PopularComponent,
    TrailersComponent,
    TvComponent,
    MovieComponent,
    HomeComponent,
    MoviespageComponent,
    TvpageComponent,
    PeoplespageComponent,
    PeopleComponent,
    SearchComponent,
    VedioplayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
