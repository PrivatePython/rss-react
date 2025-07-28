import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../src/pages/NotFoundPage.tsx';

const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders not found page', async () => {
    renderWithRouter('/not-found');

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to the home page/i)).toBeInTheDocument();
  });

  it('should renders Home page when click the button', async () => {
    renderWithRouter('/not-found');
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Go to the home page'));

    await waitFor(() => {
      expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
  });
});
