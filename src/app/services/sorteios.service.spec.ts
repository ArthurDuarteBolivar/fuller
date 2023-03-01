import { TestBed } from '@angular/core/testing';

import { SorteiosService } from './sorteios.service';

describe('SorteiosService', () => {
  let service: SorteiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SorteiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
