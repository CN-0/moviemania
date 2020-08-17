import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class FetchData{
    constructor(private http: HttpClient, private authService: AuthService){}

    getWatchlist(): any {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
              if (!user){
                throw new Error ('plz do Authenticate');
              }
              return this.http
              .get(environment.serverURL + '/users/watchlist', {headers: new HttpHeaders({Authorization: user.userToken})});
            })
        );
    }
    getFavorites(): any {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
              if (!user){
                throw new Error ('plz do Authenticate');
              }
              return this.http
              .get(environment.serverURL + '/users/favorites', {headers: new HttpHeaders({Authorization: user.userToken})});
            })
        );
    }
}
