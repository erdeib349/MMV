import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule,MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink,RouterLinkActive} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { NavbarComponent } from './shared/navbar/navbar.component';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'MMV';
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  /*  */
  navLinks = [
    { path: '/home', label: 'Jegyvásárlás' },
    { path: '/berlet', label: 'Bérletvásárlás' },
    { path: '/kosar', label: 'Kosár' }
  ]; /*  */


  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.signOut();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}


