import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './App';

// The real gate runs; the rest of the app is replaced by markers, to see what mounts and when.
vi.mock('./app/contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='auth-provider'>{children}</div>
  ),
}));
vi.mock('./Router', () => ({ Router: () => <p>o app</p> }));

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('does not start the login check until the API is awake, so a sleeping API cannot look like an expired session', async () => {
    let answer: (response: { ok: boolean }) => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            answer = resolve;
          }),
      ),
    );
    render(<App />);

    await act(async () => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.queryByTestId('auth-provider')).not.toBeInTheDocument();
    expect(screen.queryByText('o app')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await act(async () => answer({ ok: true }));

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByText('o app')).toBeInTheDocument();
  });
});
