import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show = false;
  showMovies = false;
  showTv = false;
  searchterm = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  search(): void{
    this.router.navigate(['/search', this.searchterm]);
  }
}
