import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription, combineLatest, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { JegyService } from '../../../services/jegy.service';
import { BerletService } from '../../../services/berlet.service';
import { User } from '../../models/AppUser';
import { Jegy } from '../../models/Jegy';
import { Berlet } from '../../models/Berlet';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Termek } from '../../models/Termek';
import { Kedvezemenyek } from '../../models/Kedvezmenyek';
import { JegytemplateComponent } from '../../jegytemplate/jegytemplate.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    JegytemplateComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  form: FormGroup;
  isLoading = true;
  temporary?: Jegy;

  megvettTermekek: string[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private jegyService: JegyService,
    private berletService: BerletService,
    private fb: FormBuilder


  ) {
    
    this.form = this.fb.group({
      keresztnev: ['',[Validators.required]],
      vezeteknev: ['',[Validators.required]],
      email: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
    console.log(this.megvettTermekek)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  trackById(index: number, item: string): string {
  return item;
}


  loadUserProfile(): void {
  this.isLoading = true;

  

  this.subscription = this.userService.getUserProfile().subscribe({
    next: (data) => {
      this.isLoading = false;
      this.user = data.user;
      //this.megvettTermekek = data.user?.Megvett || [];
      this.megvettTermekek = (data.user?.Megvett || []).filter(id => !!id && id.trim() !== '');

      this.form.patchValue({
      vezeteknev: this.user?.nev?.vezeteknev || '',
      keresztnev: this.user?.nev?.keresztnev || '',
      email: this.user?.email || ''
});
    },
    error: (err) => {
      console.error('Hiba a profil vagy termékek betöltésekor:', err);
      this.isLoading = false;
    }
  });
}


  

  public isBerlet(termek: Termek): termek is Berlet & { tipus: 'berlet' } {
    return 'tartomany' in termek;
  }

  public isJegy(termek: Termek): termek is Jegy & { tipus: 'jegy' } {
    return 'honnanan' in termek;
  }

  



  onSave(): void {
    if (!this.user?.id) return;

    const updatedData = {
      nev: {
        keresztnev: this.form.value.keresztnev,
        vezeteknev: this.form.value.vezeteknev
      },
      email: this.form.value.email
    };

    this.userService.updateUserData(this.user.id, updatedData)
      .then(() => {
        alert('Sikeres mentés!');
        this.loadUserProfile();
      })
      .catch((err: unknown) => console.error('Hiba mentéskor:', err));
  }

  getUserInitials(): string {
    if (!this.user || !this.user.nev) return '?';

    const firstInitial = this.user.nev.keresztnev?.charAt(0).toUpperCase() ?? '';
    const lastInitial = this.user.nev.vezeteknev?.charAt(0).toUpperCase() ?? '';

    return firstInitial + lastInitial;
  }
}

