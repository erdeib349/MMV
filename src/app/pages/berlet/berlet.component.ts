import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { BoldDirective } from '../../directives/bold-text.directive';
import { Berlet } from '../../models/Berlet';

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
    BoldDirective
  ],
  templateUrl: './berlet.component.html',
  styleUrl: './berlet.component.scss',
})
export class BerletComponent {
  selectedBerlet: 'tartomany' | 'birodalom' | '' = '';
  selectedTartomany: string = '';
  berletError: string = '';

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

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

  berletKeres() {
    this.berletError = '';
  
    if (!this.selectedBerlet) {
      this.berletError = 'Válasszon egy bérlettípust!';
      return;
    }
  
    if (this.selectedBerlet === 'tartomany' && !this.selectedTartomany) {
      this.berletError = 'Válasszon egy tartományt!';
      return;
    }
  
    const keresesiAdatok:Berlet = {
      tipus: this.selectedBerlet as 'tartomany' | 'birodalom',
      tartomany: this.selectedTartomany
    };
  
    localStorage.setItem('kereses', JSON.stringify(keresesiAdatok));
    console.log('Bérlet adatok mentve:', keresesiAdatok);
    this.openSnackBar('Bérlet keresés elindítva!', 'OK');
  } 
}

