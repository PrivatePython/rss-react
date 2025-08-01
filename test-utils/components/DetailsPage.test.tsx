import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../../src/pages/DetailsPage.tsx';
import * as pokemonService from '../../src/services/pokemon.service';
import { mockResults } from '../mocks/mocks.ts';

const renderWithRouter = (initialPath = '/1') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/:detail" element={<DetailsPage />} />
        <Route path="/not-found" element={<div>Not Found Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CardDetailPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders pokemon details', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonData').mockResolvedValue(mockResults[0]);

    renderWithRouter('/1');

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/A strange seed was planted/i)).toBeInTheDocument();
      expect(screen.getByText(/grass/i)).toBeInTheDocument();
      expect(screen.queryByTestId('loader-image')).not.toBeInTheDocument();
    });
  });

  it('should be redirects to not-found page if detail param is invalid', async () => {
    renderWithRouter('/0.12');

    await waitFor(() => {
      expect(screen.getByText(/Not Found Page/i)).toBeInTheDocument();
    });
  });
});
