import { TestBed } from '@angular/core/testing';

import { GanhadoresService } from './ganhadores.service';

describe('GanhadoresService', () => {
  let service: GanhadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanhadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
