import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrendingCard } from '../trending/trendingcard.model';
import { DataService } from '../data.service';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  trailersData: TrendingCard[];
  backgroundImage: string;

  constructor(private http: HttpClient, private dataService: DataService, private vedioService: VedioPlayerService) { }

  ngOnInit(): void {
    this.dataService.trailerDataEmitter
      .subscribe(data => {
        this.trailersData = data;
        this.backgroundImage = data[0].backdrop_path;
      });
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
