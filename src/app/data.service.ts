import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrendingCard } from '../app/trending/trendingcard.model';

@Injectable({providedIn: 'root'})
export class DataService {
    trailerDataEmitter = new Subject<TrendingCard[]>();
}
@Injectable({providedIn: 'root'})
export class CarousalService {
    carousalDataEmitter = new Subject<TrendingCard>();
}
