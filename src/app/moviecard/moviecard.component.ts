import { Component, OnInit, Input } from '@angular/core';
import { TrendingCard } from '../trending/trendingcard.model';
import { TvCard } from '../trending/tvcard.model';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {
  @Input() Moviecard: TrendingCard;
  @Input() Tvcard: TvCard;
  constructor() { }

  ngOnInit(): void {
  }

}
