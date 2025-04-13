  import { Component } from '@angular/core';
  import { MatCardModule } from '@angular/material/card';
  import { MatIconModule } from '@angular/material/icon';
  import { RouterLink } from '@angular/router';


  @Component({
    selector: 'app-pagenotfound',
    imports: [MatCardModule,MatIconModule,RouterLink],
    templateUrl: './pagenotfound.component.html',
    styleUrl: './pagenotfound.component.scss'
  })
  export class PagenotfoundComponent {

  }
