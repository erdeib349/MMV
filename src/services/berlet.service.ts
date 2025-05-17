import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Berlet } from '../app/models/Berlet';

@Injectable({
  providedIn: 'root'
})
export class BerletService {
  constructor(private firestore: Firestore) {}

  getBerletById(id: string): Observable<Berlet> {
    const berletDoc = doc(this.firestore, `Megvett/${id}`);
    return docData(berletDoc, { idField: 'id' }) as Observable<Berlet>;
  }
}
