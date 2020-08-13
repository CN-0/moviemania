import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  show = false;
  showMovies = false;
  showTv = false;
  showOptions = false;
  searchterm = '';
  isAuthenticated: boolean;
  email: string;
  private userSub: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user;
    this.email = user ? user.email.slice(0, 1) : null;
  });
  }
  search(): void{
    this.router.navigate(['search', this.searchterm]);
    this.searchterm = '';
  }
  authenticate(address: any): void{
    this.router.navigate(['auth', address], { state: { redirect: this.router.url } });
  }
  logout(): void{
    this.authService.logout();
  }
  ngOnDestroy(): void{
    this.userSub.unsubscribe();
  }
}
