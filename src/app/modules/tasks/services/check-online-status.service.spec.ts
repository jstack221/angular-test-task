import { TestBed } from '@angular/core/testing';

import { CheckOnlineStatusService } from './check-online-status.service';

describe('CheckOnlineStatusService', () => {
  let service: CheckOnlineStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOnlineStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
