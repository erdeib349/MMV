  import { Component } from '@angular/core';
  import { RouterLink } from '@angular/router';
  import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { CommonModule } from '@angular/common';
  import { BoldDirective } from '../../directives/bold-text.directive';
  import { LowercasePipe } from '../../pipes/lower-pipe.pipe';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { User } from '../../models/AppUser';
  import { AuthService } from '../../../services/auth.service';
  import { Subscription } from 'rxjs';

  import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      RouterLink,
      BoldDirective,
      LowercasePipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  })
  export class LoginComponent {
    email = new FormControl('');
    password = new FormControl('');
    isLoggedIn: boolean = false;
    loginError: string = '';
    authSubscription?: Subscription;

    constructor(
      private snackBar: MatSnackBar,
      private router: Router,
      private authService: AuthService
      ) {}

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }


    login() {
      if (this.email.invalid) {
        this.loginError = 'Please enter a valid email address';
        return;
      }
      
      if (this.password.invalid) {
        this.loginError = 'Password must be at least 6 characters long';
        return;
      }
  
      const emailValue = this.email.value || '';
      const passwordValue = this.password.value || '';
      
      this.loginError = '';
  
      this.authService.signIn(emailValue, passwordValue)
        .then(userCredential => {
          console.log('Login successful:', userCredential.user);
          this.authService.updateLoginStatus(true);
          this.openSnackBar('Sikeres bejelentkezés!', 'Bezár');
          this.router.navigateByUrl('/home');
        })
        .catch(error => {
          console.error('Login error:', error);
          
          switch(error.code) {
            case 'auth/user-not-found':
              this.loginError = 'Nincs felhasználó ezzel az email címmel';
              break;
            case 'auth/wrong-password':
              this.loginError = 'Helytelen jelszó';
              break;
            case 'auth/invalid-credential':
              this.loginError = 'Helytelen email vagy jelszó';
              break;
            default:
              this.loginError = 'Azonosítás sikertelen,gyere vissza később.';
          }
        });
    }
  
    ngOnDestroy() {
      this.authSubscription?.unsubscribe();
    }
  }