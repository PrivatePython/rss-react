import { expect } from 'vitest';

describe('main', () => {
  it('Should be renders when root exist', async () => {
    await import('../../src/main.tsx');

    expect(document.getElementById('root')?.innerHTML).not.toBeNull();
  });
});
