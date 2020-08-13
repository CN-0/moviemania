import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
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
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './loading/loading.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { UserComponent } from './user/user.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    AuthComponent,
    LoadingComponent,
    MoviecardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
