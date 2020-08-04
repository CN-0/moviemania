import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrendingCard } from '../trending/trendingcard.model';
import { TvCard } from '../trending/tvcard.model';
import { CarousalService } from '../data.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  Streaming: TrendingCard[];
  Ontv: TvCard[];
  Intheaters: TrendingCard[];
  display: string;


  constructor(private http: HttpClient, private carousalService: CarousalService) { }

  ngOnInit(): void {
    this.display = 'streaming';
    this.http
      .get<{page: number, results: TrendingCard[], total_pages: number, total_results: number }>('https://api.themoviedb.org/3/movie/popular?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.Streaming = response.results;
        this.carousalService.carousalDataEmitter.next(response.results[9]);
        this.carousalService.carousalDataEmitter.next(response.results[8]);
      });
  }

  loadOntv(): void {
    this.display = 'ontv';
    if (!this.Ontv){
      this.http
      .get<{page: number, results: [], total_pages: number, total_results: number }>
      ('https://api.themoviedb.org/3/tv/on_the_air?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.Ontv = response.results;
      });
    }
  }

  loadInTheaters(): void {
    this.display = 'intheaters';
    if (!this.Intheaters){
      this.http
      .get<{page: number, results: [], dates: {}, total_pages: number, total_results: number }>('https://api.themoviedb.org/3/movie/now_playing?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.Intheaters = response.results;
      });
    }
  }

}
