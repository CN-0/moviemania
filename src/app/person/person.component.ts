import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Person, PersonCredits } from '../shared/people.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-people',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  id: number;
  person: Person;
  credits: PersonCredits;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.loadPerson();
    });
  }
  loadPerson(): void {
    this.http
      .get<Person>('https://api.themoviedb.org/3/person/' + this.id + '?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.person = response;
      });
    this.http
      .get<PersonCredits>('https://api.themoviedb.org/3/person/' + this.id + '/combined_credits?api_key=' + environment.ApiKey + '&language=en-US')
      .subscribe(response => {
        this.credits = response;
      });
  }

}
