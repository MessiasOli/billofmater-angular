import { TestBed } from '@angular/core/testing';

import { DbMongooseService } from './db-mongoose.service';

describe('DbMongooseService', () => {
  let service: DbMongooseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbMongooseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
