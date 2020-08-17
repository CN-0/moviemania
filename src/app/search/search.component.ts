import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Card } from '../shared/card.model';
import { People } from '../shared/people.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchterm: string;
  page = {movie: 0, tv: 0, person: 0, keyword: 0};
  type = 'movie';
  MovieList: Card[] = [];
  TvList: Card[] = [];
  PersonList: People[] = [];
  KeyWords: {id: number, name: string}[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.searchterm = params.id;
      this.MovieList = [];
      this.page = {movie: 0, tv: 0, person: 0, keyword: 0};
      this.searchMovie();
    });
  }
  searchMovie(): void{
    this.type = 'movie';
    this.page = {movie: this.page.movie + 1, tv: 0, person: 0, keyword: 0};
    this.PersonList = [];
    this.TvList = [];
    this.KeyWords = [];
    if (!this.searchterm) { return null; }
    this.http
      .get<{page: number, results: Card[], total_pages: number, total_results: number}>
      ('https://api.themoviedb.org/3/search/movie?api_key=' + environment.ApiKey + '&language=en-US&query=' +
      this.searchterm + '&page=' + this.page.movie + '&include_adult=true')
      .subscribe(response => {
        this.MovieList = this.MovieList.concat(response.results);
      });
  }
  searchTv(): void{
    this.type = 'tv';
    this.page = {movie: 0, tv: this.page.tv + 1, person: 0, keyword: 0};
    this.MovieList = [];
    this.PersonList = [];
    this.KeyWords = [];
    this.http
      .get<{page: number, results: Card[], total_pages: number, total_results: number}>
      ('https://api.themoviedb.org/3/search/tv?api_key=' + environment.ApiKey + '&language=en-US&page=' +
      this.page.tv + '&query=' + this.searchterm + '&include_adult=true')
      .subscribe(response => {
        this.TvList = this.TvList.concat(response.results);
      });
  }
  searchPerson(): void{
    this.type = 'person';
    this.page = {movie: 0, tv: 0, person: this.page.person + 1, keyword: 0};
    this.MovieList = [];
    this.TvList = [];
    this.KeyWords = [];
    this.http
      .get<{page: number, results: People[], total_pages: number, total_results: number}>
      ('https://api.themoviedb.org/3/search/person?api_key=' + environment.ApiKey + '&language=en-US&query=' +
      this.searchterm + '&page=' + this.page.person + '&include_adult=true')
      .subscribe(response => {
        this.PersonList = this.PersonList.concat(response.results);
      });
  }
  searchKeyword(): void{
    this.type = 'keyword';
    this.page = {movie: 0, tv: 0, person: 0, keyword: this.page.keyword + 1};
    this.MovieList = [];
    this.TvList = [];
    this.PersonList = [];
    this.http
      .get<{page: number, results: {id: number, name: string}[], total_pages: number, total_results: number}>
      ('https://api.themoviedb.org/3/search/keyword?api_key=' + environment.ApiKey + '&query=' + this.searchterm +
      '&page=' + this.page.keyword)
      .subscribe(response => {
        this.KeyWords = this.KeyWords.concat(response.results);
      });
  }
  loadMore(): void{
    if (this.type === 'movie'){
      this.searchMovie();
    }else if (this.type === 'tv'){
      this.searchTv();
    }else if (this.type === 'person'){
      this.searchPerson();
    }else{
      this.searchKeyword();
    }
  }

}

