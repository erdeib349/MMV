import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule,MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink,RouterLinkActive} from '@angular/router';

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

export class AppComponent implements OnInit{
  title = 'MMV';
  isLoggedIn = false;

  /*  */
  navLinks = [
    { path: '/home', label: 'Jegyvásárlás' },
    { path: '/berlet', label: 'Bérletvásárlás' },
    { path: '/kosar', label: 'Kosár' }
  ]; /*  */

  constructor() {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}


