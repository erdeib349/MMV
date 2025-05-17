import { Injectable } from '@angular/core';
import { doc, docData, DocumentData, DocumentReference, Firestore,getDoc } from '@angular/fire/firestore';
import { Observable,firstValueFrom,take } from 'rxjs';
import { Jegy } from '../app/models/Jegy';
import { AuthService } from './auth.service';
import { User } from '../app/models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class JegyService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async getJegyById(charId: string): Promise<Jegy | null> {
    try {
      const user = await firstValueFrom(
        this.authService.currentUser.pipe(take(1))
      );
      if (!user) {
        console.log("nincs user")
        return null;

      }
      const userDocRef = doc(this.firestore,"Users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("nincs doc");
        return null;
      }
      const userData = userDoc.data() as User;
      if (!userData.Megvett) {
        console.log("megvett tömb nem létezik");
        return null;
      }
      if(!userData.Megvett.includes(charId)){
        console.log("nem található id + " +charId);

        return null;
      }

      const charDocRef = doc(this.firestore, "Jegyek", charId);
      const charSnapshot = await getDoc(charDocRef);
      if (charSnapshot.exists()) {
        console.log('Jegy found');
        return { ...charSnapshot.data(), id: charId } as Jegy;
      }
      console.log('Jegy not found');
      return null;
    } catch (error) {
      console.error('Hiba a jegy lekérésekor:', error);
      return null;
    }
  }

}

