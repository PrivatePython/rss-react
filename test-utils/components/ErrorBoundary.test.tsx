import ErrorBoundary from '../../src/Components/ErrorBoundary.tsx';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../src/App.tsx';
import { expect } from 'vitest';

describe('ErrorBoundary', () => {
  it('Should be renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="test-child">No error</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('displays fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByTestId('error-button'));

    expect(screen.getByText(/ups! something wrong/i)).toBeInTheDocument();
    expect(screen.getByText('This is the Error for testing ErrorBoundary')).toBeInTheDocument();
    expect(screen.getByTestId('reset-after-error-button')).toBeInTheDocument();
  });

  it('resets error state when reset button is clicked', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByTestId('error-button'));

    expect(await screen.findByTestId('reset-after-error-button')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('reset-after-error-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('reset-after-error-button')).not.toBeInTheDocument();
    });
  });
});
