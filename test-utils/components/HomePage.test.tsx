import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomePage from '../../src/pages/HomePage.tsx';
import * as pokemonService from '../../src/services/pokemon.service';
import { fakeBaseData, fakeResponse, fakeSpeciesData } from '../mocks/mocks.ts';

const mockPokemonList = [
  {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
    height: 7,
    weight: 69,
    description: 'A strange seed was planted.',
    color: 'green',
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading and then pokemon list', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonResponseData').mockResolvedValue(fakeResponse);
    vi.spyOn(pokemonService, 'fetchPokemonDataList').mockResolvedValue(mockPokemonList);

    render(<HomePage />);

    expect(screen.getByTestId('loader-image'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader-image')).not.toBeInTheDocument();
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonResponseData').mockRejectedValue(new Error('Fail'));

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/error with load pokemon/i)).toBeInTheDocument();
    });
  });

  it('should searchPokemon return correct data', async () => {
    vi.spyOn(pokemonService, 'fetchPokemonData').mockResolvedValue({
      ...fakeBaseData,
      description: fakeSpeciesData.flavor_text_entries[0].flavor_text,
      color: fakeSpeciesData.color.name,
    });
    render(<HomePage />);

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

    render(<HomePage />);

    const input = screen.getByTestId('search-pokemon-input');
    fireEvent.change(input, { target: { value: 'bulbasa' } });

    const button = screen.getByTestId('search-pokemon-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Pokemon Not Found!/i)).toBeInTheDocument();
    });
  });
});
