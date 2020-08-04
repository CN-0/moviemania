import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrendingCard } from './trendingcard.model';
import { DataService, CarousalService } from '../data.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  trendingToday: TrendingCard[];
  trendingWeek: TrendingCard[];
  today = true;

  constructor(private http: HttpClient, private dataService: DataService, private carousalService: CarousalService ) {}

  ngOnInit(): void {
    this.http
      .get<{page: number; results: TrendingCard[]; total_pages: number, total_results: number }>('https://api.themoviedb.org/3/trending/all/day?api_key=' + environment.ApiKey)
      .subscribe(response => {
        this.trendingToday = response.results;
        this.dataService.trailerDataEmitter.next(response.results);
        this.carousalService.carousalDataEmitter.next(response.results[0]);
        this.carousalService.carousalDataEmitter.next(response.results[4]);
        this.carousalService.carousalDataEmitter.next(response.results[6]);
      });
  }

  changeList(): void {
    this.today = false;
    if (!this.trendingWeek){
      this.http
      .get<{page: number; results: []; total_pages: number, total_results: number }>('https://api.themoviedb.org/3/trending/all/week?api_key=' + environment.ApiKey)
      .subscribe(response => {
        this.trendingWeek = response.results;
      });
    }
  }

}
