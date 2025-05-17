import { TestBed } from '@angular/core/testing';

import { JegyService } from './jegy.service';

describe('JegyService', () => {
  let service: JegyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JegyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
