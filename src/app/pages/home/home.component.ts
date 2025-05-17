import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextShadowDirective } from '../../directives/text-shadow.directive';
import { BoldDirective } from '../../directives/bold-text.directive';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Firestore importálása
import { inject } from '@angular/core';
import { Jegy } from '../../models/Jegy';
import { Kedvezemenyek } from '../../models/Kedvezmenyek';
import moment from 'moment';

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
  honnanan = new FormControl('');
  hova = new FormControl('');
  mikor = new FormControl(null);
  utasokSzama = new FormControl(1);
  
  kedvezmenyek: Kedvezemenyek = {
    diak: false,
    nyugdijas: false,
    csaladi: false
  }

  firestore: Firestore = inject(Firestore); // Firestore injektálása

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute) {
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

  async vonatKeres() {
    const keresesiAdatok: Jegy = {
      honnanan: this.honnanan.value || '',
      hova: this.hova.value || '',
      datum: this.mikor.value ? 
      (this.mikor.value as moment.Moment).format('YYYY-MM-DD') : '',  
      utasSzam: this.utasokSzama.value ?? 0,
      kedvezmenyek: this.kedvezmenyek 
    };

    this.inputError = '';
    
    if (this.honnanan.value === "" || this.hova.value === "" || this.mikor.value === null) {
      this.inputError = 'Töltse ki a kötelező mezőket!';
    } else {
      // Firestore-ba mentés
      try {
        const docRef = await addDoc(collection(this.firestore, 'jegyKereses'), keresesiAdatok);
        console.log('Keresési adatok mentve, ID:', docRef.id);
        this.openSnackBar('Keresés elindítva!', 'OK');
      } catch (e) {
        console.error('Hiba mentés közben:', e);
        this.openSnackBar('Hiba történt a mentés során!', 'OK');
      }

      localStorage.setItem('kereses', JSON.stringify(keresesiAdatok));
      console.log('Keresési adatok mentve:', keresesiAdatok);
    }
  }
}
