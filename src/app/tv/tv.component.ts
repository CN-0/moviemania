import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';
import { TvModel } from './tv.model';
import { TvCard } from '../trending/tvcard.model';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  id: number;
  backgroundImage: string;
  currentRate: number;
  tv: TvModel;
  creators: {id: number,
    cast: {
      character: string,
      credit_id: string,
      id: number,
      name: string,
      order: number,
      profile_path?: string,
      gender?: number
  }[],
    crew: {
      credit_id: string,
      department: string,
      id: number,
      job: string,
      name: string,
      profile_path?: string,
      gender?: number
    }[]};
  recomendations: TvCard[];
  reviews: {author: string, content: string, id: string, url: string}[];
  vedios: {id: string, iso_639_1: string, iso_3166_1: string, key: string, name: string, site: string, size: number, type: string}[];
  keywords: {id: number, name: string}[];
  genres: {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private vedioService: VedioPlayerService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.loadTv();
    });
  }
  loadTv(): void {
    this.http
      .get<TvModel>('https://api.themoviedb.org/3/tv/' + this.id + '?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.tv = response;
        this.backgroundImage = response.backdrop_path;
        this.currentRate = response.vote_average / 2;
      });
    this.http
      .get<{id: number, cast: [], crew: []}>('https://api.themoviedb.org/3/tv/' + this.id + '/credits?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.creators = response;
      });
    this.http
      .get<{page: number, results: [], total_pages: number, total_results: number}>('https://api.themoviedb.org/3/tv/' + this.id + '/recommendations?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.recomendations = response.results;
      });
    this.http
      .get<{id: number, page: number, results: [], total_pages: number, total_results: number }>
      ('https://api.themoviedb.org/3/tv/' + this.id + '/reviews?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.reviews = response.results;
      });
    this.http
      .get<{id: number, results: [] }>
      ('https://api.themoviedb.org/3/tv/' + this.id + '/videos?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.vedios = response.results;
      });
    this.http
      .get<{id: number, results: {id: number, name: string}[] }>
      ('https://api.themoviedb.org/3/tv/' + this.id + '/keywords?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.keywords = response.results;
      });
  }

  openVedio(key): void{
    this.vedioService.vedioDataEmitter.next(key);
  }

}
