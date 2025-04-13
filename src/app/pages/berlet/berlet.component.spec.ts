import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerletComponent } from './berlet.component';

describe('BerletComponent', () => {
  let component: BerletComponent;
  let fixture: ComponentFixture<BerletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
