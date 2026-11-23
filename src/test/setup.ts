import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom does not implement these — stub them so components can run.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

// AudioContext does not exist in jsdom — the engine already degrades
// gracefully, so nothing else to stub.
