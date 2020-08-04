import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TvCard } from '../trending/tvcard.model';

@Component({
  selector: 'app-tvpage',
  templateUrl: './tvpage.component.html',
  styleUrls: ['./tvpage.component.css']
})
export class TvpageComponent implements OnInit {
  presentRoute: string;
  loadPage = 0;
  TvShowsList: TvCard[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.presentRoute = params.id;
      this.loadPage = 0;
      this.TvShowsList = [];
      this.loadTvShowsList();
    });
  }
  loadTvShowsList(): void{
    this.loadPage = this.loadPage + 1;
    this.http
        .get<{page: number, results: TvCard[], total_pages: number, total_results: number }>
        ('https://api.themoviedb.org/3/tv/' + this.presentRoute +
         '?api_key=' + environment.ApiKey + '&language=en-US&page=' + this.loadPage)
        .subscribe(response => {
          this.TvShowsList = this.TvShowsList.concat(response.results);
        });
  }

}
