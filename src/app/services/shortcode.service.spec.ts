import { TestBed } from '@angular/core/testing';

import { ShortcodeService } from './shortcode.service';

describe('ShortcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShortcodeService = TestBed.get(ShortcodeService);
    expect(service).toBeTruthy();
  });
});
