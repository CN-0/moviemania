import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ItemModel } from './item.model';
import { Card } from '../shared/card.model';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';
import { PostItem, PostServer } from './postserver.service';

@Component({
  selector: 'app-movie',
  templateUrl: './itempage.component.html',
  styleUrls: ['./itempage.component.css']
})
export class ItempageComponent implements OnInit {
  id: number;
  type: string;
  backgroundImage: string;
  item: ItemModel;
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
  recomendations: Card[];
  reviews: {author: string, content: string, id: string, url: string}[];
  vedios: {id: string, iso_639_1: string, iso_3166_1: string, key: string, name: string, site: string, size: number, type: string}[];
  keywords: {id: number, name: string}[];
  genres: {};
  postItem: PostItem;

  constructor(private route: ActivatedRoute, private http: HttpClient, private vedioService: VedioPlayerService,
              private postServer: PostServer ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.type = params.type;
      this.id = params.id;
      this.loadItem();
    });
  }

  loadItem(): void{
    this.http
    .get<ItemModel>(`https://api.themoviedb.org/3/${this.type}/${this.id}?api_key=${environment.ApiKey}&language=en-US`)
    .subscribe(response => {
      this.item = response;
      this.currentRate = response.vote_average / 2;
      this.backgroundImage = response.backdrop_path;
    });
    this.http
      .get<{id: number, cast: [], crew: []}>(`https://api.themoviedb.org/3/${this.type}/${this.id}/credits?api_key=${environment.ApiKey}&language=en-US`)
      .subscribe(response => {
        this.creators = response;
      });
    this.http
      .get<{page: number, results: [], total_pages: number, total_results: number}>(`https://api.themoviedb.org/3/${this.type}/${this.id}/recommendations?api_key=${environment.ApiKey}&language=en-US&page=1`)
      .subscribe(response => {
        this.recomendations = response.results;
      });
    this.http
      .get<{id: number, page: number, results: [], total_pages: number, total_results: number }>(`https://api.themoviedb.org/3/${this.type}/${this.id}/reviews?api_key=${environment.ApiKey}&language=en-US&page=1`)
      .subscribe(response => {
        this.reviews = response.results;
      });
    this.http
      .get<{id: number, results: [] }>
      (`https://api.themoviedb.org/3/${this.type}/${this.id}/videos?api_key=${environment.ApiKey}&language=en-US`)
      .subscribe(response => {
        this.vedios = response.results;
      });
    this.http
      .get<{id: number, keywords: {id: number, name: string}[] }>
      (`https://api.themoviedb.org/3/${this.type}/${this.id}/keywords?api_key=${environment.ApiKey}&language=en-US`)
      .subscribe(response => {
        this.keywords = response.keywords;
      });
  }
  openVedio(key): void{
    this.vedioService.vedioDataEmitter.next(key);
  }

  postItemToServer(itemtype: string): void{
    let postItemtype: string;
    if (itemtype === 'favorite'){
      if (this.type === 'movie'){
        postItemtype = 'favoriteMovies';
      }else{
        postItemtype = 'favoriteTvShows';
      }
    }else{
      if (this.type === 'movie'){
        postItemtype = 'watchlistMovies';
      }else{
        postItemtype = 'watchlistTvShows';
      }
    }
    this.postItem = {
      id: this.item.id,
      name: this.item.title || this.item.name,
      rating: this.item.vote_average,
      overview: this.item.overview,
      poster: this.item.poster_path
    };
    this.postServer.postItemToSever(postItemtype, this.postItem);
  }
}

