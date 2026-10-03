import { describe, expect, it } from 'vitest';

import { healthUrlFor } from './api';

describe('healthUrlFor', () => {
  it('appends /health to the API address', () => {
    expect(healthUrlFor('https://api.example')).toBe('https://api.example/health');
  });

  it('does not double the slash when the address ends with one', () => {
    expect(healthUrlFor('https://api.example/')).toBe('https://api.example/health');
    expect(healthUrlFor('https://api.example///')).toBe('https://api.example/health');
  });

  it('copes with an address that is not set, instead of pinging "undefined/health"', () => {
    expect(healthUrlFor(undefined)).toBe('/health');
  });
});
