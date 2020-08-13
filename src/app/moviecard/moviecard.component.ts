import { Component, OnInit, Input } from '@angular/core';
import { MovieCard } from '../shared/moviecard.model';
import { TvCard } from '../shared/tvcard.model';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {
  @Input() Moviecard: MovieCard;
  @Input() Tvcard: TvCard;
  constructor() { }

  ngOnInit(): void {
  }
}
