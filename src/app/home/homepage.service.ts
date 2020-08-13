import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieCard } from '../shared/moviecard.model';

export class TrendingData {
  constructor(
      public id: number,
      public name: string,
      public overview: string,
      public rating: number,
      public poster?: string
  ) {}
}

@Injectable({providedIn: 'root'})
export class HomePage {
    constructor(private http: HttpClient){}
    getPopularList(): any{
      return this.http
      .get<{page: number, results: MovieCard[], total_pages: number, total_results: number }>('https://api.themoviedb.org/3/movie/popular?api_key=' + environment.ApiKey + '&language=en-US&page=1');
    }
    getOnTv(): any{
      return this.http
      .get<{page: number, results: [], total_pages: number, total_results: number }>
      ('https://api.themoviedb.org/3/tv/on_the_air?api_key=' + environment.ApiKey + '&language=en-US&page=1');
    }
    getInTheaters(): any{
        return this.http
        .get<{page: number, results: [], dates: {}, total_pages: number, total_results: number }>('https://api.themoviedb.org/3/movie/now_playing?api_key=' + environment.ApiKey + '&language=en-US&page=1');
    }
    getTrendingDaily(): any{
      return this.http
      .get<{page: number; results: MovieCard[]; total_pages: number, total_results: number }>('https://api.themoviedb.org/3/trending/all/day?api_key=' + environment.ApiKey);
    }
    getTrendingWeekly(): any{
      return this.http
      .get<{page: number; results: []; total_pages: number, total_results: number }>('https://api.themoviedb.org/3/trending/all/week?api_key=' + environment.ApiKey);
    }
}
