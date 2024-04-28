import { TestBed } from '@angular/core/testing';

import { CepApiExternalService } from './cep-api-external.service';

describe('CepApiExternalService', () => {
  let service: CepApiExternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepApiExternalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
