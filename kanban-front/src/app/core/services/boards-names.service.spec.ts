import { TestBed } from '@angular/core/testing';

import { BoardsNamesService } from './boards-names.service';

describe('BoardsNamesService', () => {
  let service: BoardsNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
