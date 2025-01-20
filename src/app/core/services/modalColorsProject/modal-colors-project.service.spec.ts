import { TestBed } from '@angular/core/testing';

import { ModalColorsProjectService } from './modal-colors-project.service';

describe('ModalColorsProjectService', () => {
  let service: ModalColorsProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalColorsProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
