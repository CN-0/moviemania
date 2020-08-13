import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchData } from './fetchdata.service';
import { PostItem } from '../postserver.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  firstPage: PostItem[];
  secondPage: PostItem[];
  constructor(private route: ActivatedRoute, private fetchData: FetchData) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id === 'favorites'){
        this.fetchData.getFavorites().subscribe((response: {favoriteMovies: PostItem[], favoriteTvShows: PostItem[]}) => {
          this.firstPage = response.favoriteMovies;
          this.secondPage = response.favoriteTvShows;
        });
      }
      if (params.id === 'watchlist'){
        this.fetchData.getWatchlist().subscribe((response: {watchlistMovies: PostItem[], watchlistTvShows: PostItem[]}) => {
          this.firstPage = response.watchlistMovies;
          this.secondPage = response.watchlistTvShows;
        });
      }
    });
  }

}
