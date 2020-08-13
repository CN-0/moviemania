import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieCard } from '../shared/moviecard.model';
import { VedioPlayerService } from '../vedioplayer/vedioplayer.service';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  @Input() trailersData: MovieCard[];
  @Input() backgroundImage: string;

  constructor(private http: HttpClient, private vedioService: VedioPlayerService) { }

  ngOnInit(): void {}
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
