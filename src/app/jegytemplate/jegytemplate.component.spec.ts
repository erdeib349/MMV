import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JegytemplateComponent } from './jegytemplate.component';

describe('JegytemplateComponent', () => {
  let component: JegytemplateComponent;
  let fixture: ComponentFixture<JegytemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JegytemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JegytemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
