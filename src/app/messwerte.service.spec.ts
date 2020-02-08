import { TestBed } from '@angular/core/testing';

import { MesswerteService } from './messwerte.service';

describe('MesswerteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesswerteService = TestBed.get(MesswerteService);
    expect(service).toBeTruthy();
  });
});
