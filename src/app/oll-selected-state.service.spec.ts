import { TestBed } from '@angular/core/testing';

import { OllSelectedStateService } from './oll-selected-state.service';

describe('OllSelectedStateService', () => {
  let service: OllSelectedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OllSelectedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
