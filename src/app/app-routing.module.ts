import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { MoviespageComponent } from './moviespage/moviespage.component';
import { TvpageComponent } from './tvpage/tvpage.component';
import { PeoplespageComponent } from './peoplespage/peoplespage.component';
import { PeopleComponent } from './people/people.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'people', component: PeoplespageComponent },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  {path: 'auth/:id', component: AuthComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'tv/:id', component: TvComponent },
  { path: 'movies/:id', component: MoviespageComponent },
  { path: 'tvshows/:id', component: TvpageComponent },
  { path: 'person/:id', component: PeopleComponent },
  {path: 'search/:id', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
