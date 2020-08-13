import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieModel } from './movie.model';
import { MovieCard } from '../shared/moviecard.model';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';
import { PostItem, PostServer } from '../postserver.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  id: number;
  backgroundImage: string;
  movie: MovieModel;
  currentRate: number;
  creators: {id: number,
    cast: {
      cast_id: number,
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
  recomendations: MovieCard[];
  reviews: {author: string, content: string, id: string, url: string}[];
  vedios: {id: string, iso_639_1: string, iso_3166_1: string, key: string, name: string, site: string, size: number, type: string}[];
  keywords: {id: number, name: string}[];
  genres: {};
  item: PostItem;

  constructor(private route: ActivatedRoute, private http: HttpClient, private vedioService: VedioPlayerService,
              private postServer: PostServer ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.loadMovie();
    });
  }

  loadMovie(): void{
    this.http
      .get<MovieModel>('https://api.themoviedb.org/3/movie/' + this.id + '?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.movie = response;
        this.currentRate = response.vote_average / 2;
        this.backgroundImage = response.backdrop_path;
      });
    this.http
      .get<{id: number, cast: [], crew: []}>('https://api.themoviedb.org/3/movie/' + this.id + '/credits?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.creators = response;
      });
    this.http
      .get<{page: number, results: [], total_pages: number, total_results: number}>('https://api.themoviedb.org/3/movie/' + this.id + '/recommendations?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.recomendations = response.results;
      });
    this.http
      .get<{id: number, page: number, results: [], total_pages: number, total_results: number }>
      ('https://api.themoviedb.org/3/movie/' + this.id + '/reviews?api_key=' + environment.ApiKey + '&language=en-US&page=1')
      .subscribe(response => {
        this.reviews = response.results;
      });
    this.http
      .get<{id: number, results: [] }>
      ('https://api.themoviedb.org/3/movie/' + this.id + '/videos?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.vedios = response.results;
      });
    this.http
      .get<{id: number, keywords: {id: number, name: string}[] }>
      ('https://api.themoviedb.org/3/movie/' + this.id + '/keywords?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.keywords = response.keywords;
      });
  }
  openVedio(key): void{
    this.vedioService.vedioDataEmitter.next(key);
  }

  postItemToServer(itemtype: string): void{
    this.item = {
      id: this.movie.id,
      name: this.movie.title,
      rating: this.movie.vote_average,
      overview: this.movie.overview,
      poster: this.movie.poster_path
    };
    this.postServer.postItemToSever(itemtype, this.item);
  }
}

