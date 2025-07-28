import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../src/Components/Layout/Layout.tsx';
import AboutPage from '../../src/pages/AboutPage.tsx';

const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders logo image and about button and then About page render', async () => {
    renderWithRouter();

    expect(screen.getByRole('img'));
    expect(screen.getByRole('button'));
    expect(screen.getByText('About'));

    fireEvent.click(screen.getByText('About'));

    await waitFor(() => {
      expect(screen.getByText(/Pavel Putyrski/i)).toBeInTheDocument();
    });
  });

  it('renders logo image and about button and then About page render', async () => {
    render(
      <MemoryRouter initialEntries={['/layout']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('img'));

    await waitFor(() => {
      expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
  });
});
