import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../shared/moviecard.model';
import { TvCard } from '../shared/tvcard.model';
import { HomePage } from './homepage.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  CarousalData: MovieCard[] = [];
  Streaming: MovieCard[];
  Ontv: TvCard[];
  Intheaters: MovieCard[];
  display: string;
  trendingToday: MovieCard[];
  trendingWeek: MovieCard[];
  today = true;

  constructor(private homePage: HomePage, config: NgbCarouselConfig){
     config.interval = 3500; config.wrap = true; config.keyboard = true; config.pauseOnHover = false; }

  ngOnInit(): void {
    this.display = 'streaming';
    this.homePage.getPopularList().subscribe(response => {
      this.Streaming = response.results;
      this.CarousalData.push(response.results[9], response.results[8]);
    });
    this.homePage.getTrendingDaily().subscribe(response => {
      this.trendingToday = response.results;
      this.CarousalData.push(response.results[0], response.results[4], response.results[6]);
    });
  }

  loadOntv(): void {
    this.display = 'ontv';
    if (!this.Ontv){
      this.homePage.getOnTv().subscribe(response => this.Ontv = response.results );
    }
  }

  loadInTheaters(): void {
    this.display = 'intheaters';
    if (!this.Intheaters){
      this.homePage.getInTheaters().subscribe(response => this.Intheaters = response.results);
    }
  }

  changeList(): void {
    this.today = false;
    if (!this.trendingWeek){
      this.homePage.getTrendingWeekly().subscribe(response => {
        this.trendingWeek = response.results;
      });
    }
  }

}
