import { TestBed } from '@angular/core/testing';

import { CubeStateService } from './cube-state.service';

describe('CubeStateService', () => {
  let service: CubeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CubeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
