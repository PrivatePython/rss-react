import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomePage from '../../src/pages/HomePage.tsx';
import * as pokemonService from '../../src/services/pokemon.service';
import { fakeBaseData, fakeResponse, fakeSpeciesData } from '../mocks/mocks.ts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { IPokemonData } from '../../src/services/pokemon.service';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store.ts';

const mockPokemonList: IPokemonData[] = [
  {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
    height: 7,
    weight: 69,
    description: 'A strange seed was planted.',
    color: 'green',
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.com/v2/species/bulbasaur',
    },
    gender: 'genderless',
    captureRate: 12,
    baseHappiness: 12,
    isLegendary: true,
    isBaby: true,
  },
];

const renderWithRouterAndProviders = (initialPath = '/1') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/:page" element={<HomePage />} />
          <Route path="/not-found" element={<div>Not Found Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading and then pokemon list', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonResponseData').mockResolvedValue(fakeResponse);
    vi.spyOn(pokemonService, 'fetchPokemonDataList').mockResolvedValue(mockPokemonList);

    renderWithRouterAndProviders('/1');

    expect(screen.getByTestId('loader-image'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader-image')).not.toBeInTheDocument();
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonResponseData').mockRejectedValue(new Error('Fail'));

    renderWithRouterAndProviders('/1');

    await waitFor(() => {
      expect(screen.getByText(/error with load pokemon/i)).toBeInTheDocument();
    });
  });

  it('should searchPokemon return correct data', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonData').mockResolvedValue({
      ...fakeBaseData,
      description: fakeSpeciesData.flavor_text_entries[0].flavor_text,
      color: fakeSpeciesData.color.name,
      gender: 'genderless',
      captureRate: 12,
      baseHappiness: 12,
      isLegendary: true,
      isBaby: true,
    });
    renderWithRouterAndProviders('/1');

    const input = screen.getByTestId('search-pokemon-input');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    const button = screen.getByTestId('search-pokemon-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });

  it('should searchPokemon return error', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonData').mockRejectedValue(new Error('Pokemon Not Found!'));

    renderWithRouterAndProviders('/1');

    const input = screen.getByTestId('search-pokemon-input');
    fireEvent.change(input, { target: { value: 'bulbasa' } });

    const button = screen.getByTestId('search-pokemon-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Pokemon Not Found!/i)).toBeInTheDocument();
    });
  });
});
