import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Jegy } from '../models/Jegy';
import { JegyService } from '../../services/jegy.service';

@Component({
  selector: 'app-jegytemplate',
  templateUrl: './jegytemplate.component.html',
  styleUrls: ['./jegytemplate.component.scss']
})
export class JegytemplateComponent implements OnChanges {
  @Input() jegyId!: string;
  jegy?: Jegy;

  constructor(private jegyService: JegyService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jegyId'] && changes['jegyId'].currentValue) {
      this.loadJegy();
    }
  }

  private loadJegy(): void {
    this.jegyService.getJegyById(this.jegyId).then((jegyecske) => {
      if (jegyecske) {
        this.jegy = jegyecske;
        console.log("Jegy betöltve:", this.jegy);
      } else {
        console.warn('Nem található ilyen jegy:', this.jegyId);
      }
    });
  }
}
