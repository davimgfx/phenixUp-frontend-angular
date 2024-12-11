import { TestBed } from '@angular/core/testing';

import { AuthBearerTokenService } from './auth-bearer-token.service';

describe('AuthBearerTokenService', () => {
  let service: AuthBearerTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBearerTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
