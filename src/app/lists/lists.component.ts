import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Card } from '../shared/card.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-moviespage',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  type: string;
  id: string;
  loadPage = 0;
  List: Card[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.type = params.type;
      this.id = params.id;
      this.loadPage = 0;
      this.List = [];
      this.loadMoviesList();
    });
  }
  loadMoviesList(): void{
    this.loadPage = this.loadPage + 1;
    this.http
        .get<{page: number, results: Card[], total_pages: number, total_results: number }>
        (`https://api.themoviedb.org/3/${this.type}/${this.id}?api_key=${environment.ApiKey}&language=en-US&page=${this.loadPage}`)
        .subscribe(response => {
          this.List = this.List.concat(response.results);
        });
  }

}
