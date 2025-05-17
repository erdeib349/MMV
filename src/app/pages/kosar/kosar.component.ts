import { Component,inject,OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TextShadowDirective } from '../../directives/text-shadow.directive';
import { MatTableModule } from '@angular/material/table';
import { Berlet } from '../../models/Berlet';
import { Jegy } from '../../models/Jegy';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-kosar',
  standalone: true,
  imports: [TextShadowDirective,MatTableModule,CommonModule],
  templateUrl: './kosar.component.html',
  styleUrl: './kosar.component.scss'
})

export class KosarComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  berletKereses$: Observable<Berlet[]> | undefined;
  jegyKereses$: Observable<Jegy[]> | undefined;

  ngOnInit() {
    const berletekRef = collection(this.firestore, 'berletKereses');
    this.berletKereses$ = collectionData(berletekRef, { idField: 'id' }) as Observable<Berlet[]>;
  

    const jegyekRef = collection(this.firestore, 'jegyKereses');
    this.jegyKereses$ = collectionData(jegyekRef, { idField: 'id' }) as Observable<Jegy[]>;

  }
}
