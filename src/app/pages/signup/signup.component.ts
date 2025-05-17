import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BoldDirective } from '../../directives/bold-text.directive';
import type { User } from '../../models/AppUser';
import { AuthService } from '../../../services/auth.service';

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
  signUpError: string = '';
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });


  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {} 

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  signup(){
    if(this.signUpForm.valid){

    this.signUpError = '';
    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;
    const email = this.signUpForm.get('email')?.value;

    if (password !== rePassword) {
      this.signUpError = 'A megadott jelszavak nem egyeznek!';
      return;
    }

    const userData: Partial<User> = {
      nev: {
        vezeteknev: this.signUpForm.value.name?.lastname || '',
        keresztnev: this.signUpForm.value.name?.firstname || ''
      },
      email: this.signUpForm.value.email || ''
    };

    if (
      !this.signUpForm.value.email ||
      !this.signUpForm.value.password ||
      !this.signUpForm.value.rePassword ||
      !this.signUpForm.value.name?.lastname ||
      !this.signUpForm.value.name?.firstname
    ) {
      this.signUpError = 'Töltse ki a kötelező mezőket!';
      return;
    }
    else {
      interface SignUpResponse {
        user: unknown;
      }

      interface SignUpError {
        code: string;
        message?: string;
      }

      this.authService.signUp(email as string, password as string, userData)
      .then((userCredential: SignUpResponse) => {
        console.log('Sikeres regisztráció!:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch((error: SignUpError) => {
        console.error('Regisztrációs hiba:', error);
        
        switch(error.code) {
          case 'auth/email-already-in-use':
        this.signUpError = 'Az email már használatban van.';
        break;
          case 'auth/invalid-email':
        this.signUpError = 'Helytelen email cím.';
        break;
          case 'auth/weak-password':
        this.signUpError = 'Gyenge jelszó, használjon legalább 6 karaktert!';
        break;
          default:
        this.signUpError = 'Hiba történt a regisztráció során. Kérjük, próbálja újra később.';
        }
      });
      
      this.openSnackBar('Sikeres regisztráció!', 'OK');
      
    }
  }
}
}
