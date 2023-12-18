// siren.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { SirenService } from './siren.service';

describe('SirenService', () => {
  let service: SirenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SirenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate a valid SIREN', () => {
    const isValid = service.CheckSirenValidity('732829320');
    expect(isValid).toBe(true);
  });

  it('should invalidate an invalid SIREN', () => {
    const isValid = service.CheckSirenValidity('732829321');
    expect(isValid).toBe(false);
  });

  it('should compute full SIREN', () => {
    const fullSiren = service.ComputeFullSiren('732829320ABCD');
    expect(fullSiren).toBe('732829320');
  });

});
