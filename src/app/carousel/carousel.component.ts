import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarousalService } from '../data.service';
import { TrendingCard } from '../trending/trendingcard.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  CarousalData: TrendingCard[] = [];

  constructor(config: NgbCarouselConfig, private carousalService: CarousalService) {
    config.interval = 3500;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.carousalService.carousalDataEmitter.subscribe((response) => {
      this.CarousalData.push(response);
    });
  }

}
