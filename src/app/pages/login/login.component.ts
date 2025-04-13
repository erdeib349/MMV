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
  import { User } from '../../models/User';

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
    //showLoginForm: boolean = true;

    constructor(private snackBar: MatSnackBar, private router: Router) {}

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }


    login() {
      this.loginError = '';

      const loginAdatok:User = {
        email: this.email.value || '',
        password: this.password.value || '',
        passwordAgn: '',
        vezeteknev: '',
        keresztnev: '',
      };
      
      if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
        this.isLoggedIn = true;
        
        /* 
        this.openSnackBar('Sikeres bejelentkezés!', 'OK');
        console.log('Bejelentkezési adatok mentve:', loginAdatok);
        window.location.href = '/home'; */

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginAdatok', JSON.stringify(loginAdatok));
      // Átirányítás query paraméterrel
        this.router.navigate(['/home'], {
        queryParams: { loginSuccess: 'true' }
        }).then(() => {
        window.location.reload(); 
      });



      } 
      else if (this.email.value === "" || this.password.value === "") {
        this.loginError = 'Töltse ki a kötelező mezőket!';
      }

      else if (this.email.value !== 'test@gmail.com' || this.password.value !== 'testpw') {
        this.loginError = 'Helytelen e-mail cím vagy jelszó!';
      }

      else {
        
        //localStorage.setItem('kereses', JSON.stringify(loginAdatok));
        
      }
    }
  }