import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieCard } from '../shared/moviecard.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-moviespage',
  templateUrl: './moviespage.component.html',
  styleUrls: ['./moviespage.component.css']
})
export class MoviespageComponent implements OnInit {
  presentRoute: string;
  loadPage = 0;
  MoviesList: MovieCard[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.presentRoute = params.id;
      this.loadPage = 0;
      this.MoviesList = [];
      this.loadMoviesList();
    });
  }
  loadMoviesList(): void{
    this.loadPage = this.loadPage + 1;
    this.http
        .get<{page: number, results: MovieCard[], total_pages: number, total_results: number }>
        ('https://api.themoviedb.org/3/movie/' + this.presentRoute +
         '?api_key=' + environment.ApiKey + '&language=en-US&page=' + this.loadPage)
        .subscribe(response => {
          this.MoviesList = this.MoviesList.concat(response.results);
        });
  }

}
