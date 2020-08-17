import { Component, OnInit } from '@angular/core';
import { Card } from '../shared/card.model';
import { HomePage } from './homepage.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  CarousalData: Card[] = [];
  Streaming: Card[];
  Ontv: Card[];
  Intheaters: Card[];
  display: string;
  trendingToday: Card[];
  trendingWeek: Card[];
  backgroundImage: string;
  today = true;

  constructor(private homePage: HomePage, config: NgbCarouselConfig, private http: HttpClient, private vedioService: VedioPlayerService){
     config.interval = 3500; config.wrap = true; config.keyboard = true; config.pauseOnHover = false; }

  ngOnInit(): void {
    this.display = 'streaming';
    this.homePage.getPopularList().subscribe(response => {
      this.Streaming = response.results;
      this.CarousalData.push(response.results[9], response.results[8]);
    });
    this.homePage.getTrendingDaily().subscribe(response => {
      this.backgroundImage = response.results[0].backdrop_path;
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
  openVedio(id: any): void{
    this.http
      .get<{id: number, results: {
        id: number,
        iso_639_1: string,
        iso_3166_1: string,
        key: string,
        name: string,
        site: string,
        size: number,
        type: string
      }[]}>('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.vedioService.vedioDataEmitter.next(response.results[0].key);
      });
  }
}
