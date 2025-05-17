import { TestBed } from '@angular/core/testing';

import { BerletService } from './berlet.service';

describe('BerletService', () => {
  let service: BerletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BerletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
