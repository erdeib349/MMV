import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BoldDirective } from '../../directives/bold-text.directive';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule, 
    RouterLink,
    BoldDirective
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = new FormControl('');
  password = new FormControl('');
  passwordAgn = new FormControl('');
  veznev = new FormControl('');
  kernev = new FormControl('');
  signupError: string = '';

  constructor(private snackBar: MatSnackBar) {} // 📌 Injektáld be a MatSnackBar-t a konstruktorban!

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // 5 másodpercig látható
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  signup(){
    this.signupError = '';

    const signupAdatok:User = {
      vezeteknev: this.veznev.value || '',
      keresztnev: this.kernev.value || '',
      email: this.email.value || '',
      password: this.password.value || '',
      passwordAgn: this.passwordAgn.value || ''
    };

    if (this.email.value === "" || this.password.value === "" 
      || this.passwordAgn.value === "" || this.veznev.value === "" 
      || this.kernev.value === "") {
      this.signupError = 'Töltse ki a kötelező mezőket!';
    } 
    else if (this.password.value !== this.passwordAgn.value) {
      this.signupError = 'A megadott jelszavak nem egyeznek!';
    }
    else {
      localStorage.setItem('kereses', JSON.stringify(signupAdatok));
      console.log('Regisztrációs adatok mentve:', signupAdatok);
      
      this.openSnackBar('Sikeres regisztráció!', 'OK');
      /* window.location.href = '/login'; */
    }
  }
}

