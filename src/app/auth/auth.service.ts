import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

export class User {
    constructor(
      public email: string,
      private token: string,
    ) {}

    get userToken(): string | null {
      return this.token;
    }
}

export interface AuthResponseData {
  token: string;
  user: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(type: string, email: string, password: string): void {
    this.http
      .post<AuthResponseData>(`http://localhost:5000/users/${type}`, { email, password })
      .pipe(
        catchError(this.handleError),
        tap((resData: AuthResponseData) => {
            const user = new User(resData.user, resData.token);
            this.user.next(user);
            this.router.navigateByUrl(window.history.state.redirect || '');
            localStorage.setItem('mmUserData', JSON.stringify(user));
        })
      ).subscribe();
  }

  autoLogin(): void {
      const userData: {email: string; token: string} = JSON.parse(localStorage.getItem('mmUserData'));
      if (!userData) {
      return;
    }
      if (!userData) {
        return;
      }
      const loadedUser = new User(userData.email, userData.token);
      if (userData.token) {
        this.user.next(loadedUser);
      }
  }

  logout(): void {
    this.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user){
          throw new Error ('plz do Authenticate');
        }
        return this.http
        .post('http://localhost:5000/users/logout', {logout: 'logout'}, {headers: new HttpHeaders({Authorization: user.userToken})});
      })).subscribe(response => {
        this.user.next(null);
        this.router.navigate(['']);
        localStorage.removeItem('mmUserData');
      });
  }


  private handleError(errorRes: HttpErrorResponse): any {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
