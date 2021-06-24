import { TestBed } from '@angular/core/testing';

import { SwitchWaitService } from './switch-wait.service';

describe('SwitchWaitService', () => {
  let service: SwitchWaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchWaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
