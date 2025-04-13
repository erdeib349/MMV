import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ReactiveFormsModule}  from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TextShadowDirective } from '../../directives/text-shadow.directive';
import { BoldDirective } from '../../directives/bold-text.directive';
import { ActivatedRoute } from '@angular/router';
import { Jegy } from '../../models/Jegy';
import { Kedvezemenyek } from '../../models/Kedvezmenyek';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TextShadowDirective,
    BoldDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})

export class HomeComponent {
  inputError: string = '';
  honnan = new FormControl('');
  hova = new FormControl('');
  mikor = new FormControl(null);
  utasokSzama = new FormControl(1);
  
  kedvezmenyek: Kedvezemenyek = {
    diak: false,
    nyugdijas: false,
    csaladi: false
  }


  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute){

      this.route.queryParams.subscribe(params => {
        if (params['loginSuccess'] === 'true') {
          this.openSnackBar('Sikeres bejelentkezés!', 'OK');
          
          const loginDataString = localStorage.getItem('loginAdatok');
          if (loginDataString) {
            const loginAdatok = JSON.parse(loginDataString);
            console.log('Bejelentkezési adatok:', loginAdatok);
          }
        }
      });

    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  vonatKeres() {
    const keresesiAdatok: Jegy = {
      honnanan: this.honnan.value || '',
      hova: this.hova.value || '',
      datum: this.mikor.value ? 
      (this.mikor.value as moment.Moment).format('YYYY-MM-DD') : '',  
      utasSzam: this.utasokSzama.value ?? 0,
      kedvezmenyek: this.kedvezmenyek 
    };

    this.inputError = '';
    
    if (this.honnan.value === "" || this.hova.value === "" 
      || this.mikor.value === null) {
      this.inputError = 'Töltse ki a kötelező mezőket!';
    } 
    else {
      localStorage.setItem('kereses', JSON.stringify(keresesiAdatok));
      console.log('Keresési adatok mentve:', keresesiAdatok);
      this.openSnackBar('Keresés elindítva!', 'OK');   
    }
  }
}
