import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .home {
      width: 85%;
      margin: auto;
      box-sizing: border-box;
    }
  `]
})
export class HomeComponent implements OnInit {
  closeResult: string;

  constructor() { }

  ngOnInit(): void {
  }

}
