import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { People } from './people.model';

@Component({
  selector: 'app-peoplespage',
  templateUrl: './peoplespage.component.html',
  styleUrls: ['./peoplespage.component.css']
})
export class PeoplespageComponent implements OnInit {
  PeoplesList: People[];
  page = 1;
  totalResults: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.http
      .get<{page: number, results: People[], total_pages: number, total_results: number}>
      ('https://api.themoviedb.org/3/person/popular?api_key=' + environment.ApiKey + '&language=en-US&page=' + this.page)
      .subscribe(response => {
        this.totalResults = response.total_results;
        this.PeoplesList = response.results;
      });
  }
  pageChanged(): void{
    this.loadPeople();
  }
}
