import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class PostItem {
    constructor(
        public id: number,
        public name: string,
        public overview: string,
        public rating: number,
        public poster?: string
    ) {}
}

@Injectable({providedIn: 'root'})
export class PostServer{
    constructor(private http: HttpClient, private authService: AuthService){}

    postItemToSever(type: string, postData: PostItem): void {
        this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
              if (!user){
                throw new Error ('plz do Authenticate');
              }
              return this.http
              .post(environment.serverURL + '/users/additem', {type, postData},
              {headers: new HttpHeaders({Authorization: user.userToken})});
            })
          ).subscribe(response => {
            console.log(response);
          },
          errorMessage => {
            console.log(errorMessage);
          }
    );
    }
}
