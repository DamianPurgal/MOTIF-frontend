import { TestBed } from '@angular/core/testing';

import { AlertWebsocketService } from './alert-websocket.service';

describe('AlertWebsocketService', () => {
  let service: AlertWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
