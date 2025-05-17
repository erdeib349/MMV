import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../app/models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        console.log('Lekérdezett user:', authUser);
        if (!authUser) {
          return of({
            user: null
          });
        }
        console.log('Lekérdezett userId:', authUser?.uid);

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      return {
        user
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null
      };
    }
  }


  async updateUserData(userId: string, data: any): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      await updateDoc(userDocRef, data);
      console.log('Felhasználói adatok frissítve.');
    } catch (error) {
      console.error('Hiba a felhasználói adatok frissítése során:', error);
      throw error;
    }
  }
}
