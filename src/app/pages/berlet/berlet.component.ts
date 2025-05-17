import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { BoldDirective } from '../../directives/bold-text.directive';
import { Berlet } from '../../models/Berlet';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; 
import { inject } from '@angular/core'; 
import { User } from '../../models/AppUser';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';

interface Tar {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-berlet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatTooltip,
    BoldDirective,
    ReactiveFormsModule
  ],
  templateUrl: './berlet.component.html',
  styleUrl: './berlet.component.scss',
})
export class BerletComponent {

  form = new FormGroup({
      selectedBerlet: new FormControl(''),
      selectedTartomany: new FormControl('')
    });


  selectedBerlet: 'tartomany' | 'birodalom' | '' = '';
  selectedTartomany: string = '';
  berletError: string = '';
  user: User | null = null;
  private subscription: Subscription | null = null;

  tartomanySelect: Tar[] = [
    { value: 'kiskun', viewValue: 'Bács-Kiskun' },
    { value: 'baranya', viewValue: 'Baranya' },
    { value: 'bekes', viewValue: 'Békés' },
    { value: 'borsod', viewValue: 'Borsod-Abaúj-Zemplén' },
    { value: 'csongrad', viewValue: 'Csongrád-Csanád' },
    { value: 'fejer', viewValue: 'Fejér' },
    { value: 'gyormoson', viewValue: 'Győr-Moson-Sopron' },
    { value: 'hajdubihar', viewValue: 'Hajdú-Bihar' },
    { value: 'heves', viewValue: 'Heves' },
    { value: 'jasznagy', viewValue: 'Jász-Nagykun-Szolnok' },
    { value: 'komarom', viewValue: 'Komárom-Esztergom' },
    { value: 'nograd', viewValue: 'Nógrád' },
    { value: 'pest', viewValue: 'Pest' },
    { value: 'somogy', viewValue: 'Somogy' },
    { value: 'szabolcs', viewValue: 'Szabolcs-Szatmár-Bereg' },
    { value: 'tolna', viewValue: 'Tolna' },
    { value: 'vas', viewValue: 'Vas' },
    { value: 'veszprem', viewValue: 'Veszprém' },
    { value: 'zala', viewValue: 'Zala' },
  ];


  private firestore: Firestore = inject(Firestore);

  constructor(private snackBar: MatSnackBar, private userService: UserService) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

  loadUser() {
    this.subscription = this.userService.getUserProfile().subscribe({
      next:(data) => {this.user = data.user},error:(error) => {console.error("Hiba a felhasználó betöltésekor: ", error)}
    })
  }

  async berletKeres() {
    this.berletError = '';
    const berlet = this.form.value.selectedBerlet;
    const tartomany = this.form.value.selectedTartomany;
  
    if (!berlet) {
      this.berletError = 'Válasszon egy bérlettípust!';
      return;
    }
  
    if (berlet === 'tartomany' && !tartomany) {
      this.berletError = 'Válasszon egy tartományt!';
      return;
    }
  
    const keresesiAdatok:Berlet = {
      tipus: this.selectedBerlet as 'tartomany' | 'birodalom',
      tartomany: this.selectedTartomany
    };

    /* const keresesiAdatok = {
      tipus: berlet,
      tartomany: tartomany
    }; */

  
    localStorage.setItem('kereses', JSON.stringify(keresesiAdatok));
    console.log('Bérlet adatok mentve:', keresesiAdatok);
    this.openSnackBar('Bérlet keresés elindítva!', 'OK');
  } 
}

