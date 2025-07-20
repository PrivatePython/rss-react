import { beforeEach, describe, expect, vi } from 'vitest';
import * as pokemonService from '../../src/services/pokemon.service';
import * as storage from '../../src/helpers/localStorage.ts';
import ControlBlock from '../../src/Components/ControlBlock/ControlBlock.tsx';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('ControlBlock', () => {
  const mockSearchPokemon = vi.fn();
  const mockShowAllPokemon = vi.fn();

  const mockPokemonList = {
    count: 3,
    next: '',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
      { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/2' },
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3' },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(pokemonService, 'fetchPokemonResponseData').mockResolvedValue(mockPokemonList);
    vi.spyOn(storage, 'getDataFromLS').mockReturnValue('');
  });

  it('should be render input, buttons and fetches pokemon list for suggestions', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    await waitFor(() => {
      expect(pokemonService.fetchPokemonResponseData).toHaveBeenCalledWith(100000);
    });

    expect(screen.getByTestId('search-pokemon-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-pokemon-button')).toBeInTheDocument();
    expect(screen.getByTestId('show-all-pokemon-button')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });

  it('should be suggestions filters and renders after input', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    await waitFor(() => screen.getByTestId('search-pokemon-input'));

    fireEvent.change(screen.getByTestId('search-pokemon-input'), {
      target: { value: 'b' },
    });

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/butterfree/i)).toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });

  it('should be input value equal clicked suggested pokemon', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    await waitFor(() => screen.getByTestId('search-pokemon-input'));

    fireEvent.change(screen.getByTestId('search-pokemon-input'), {
      target: { value: 'bul' },
    });

    const suggestion = await screen.findByText(/bulbasaur/i);
    fireEvent.click(suggestion);

    expect(screen.getByTestId('search-pokemon-input').getAttribute('value')).toBe('bulbasaur');
  });

  it('should be show error if input is empty when click on search', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    fireEvent.click(screen.getByTestId('search-pokemon-button'));

    expect(await screen.findByText(/enter the pokemon name/i)).toBeInTheDocument();
    expect(mockSearchPokemon).not.toHaveBeenCalled();
  });

  it('should be searchPokemon with correct name and save in local storage', async () => {
    const saveDataInLSSpy = vi.spyOn(storage, 'saveDataInLS');

    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    fireEvent.change(screen.getByTestId('search-pokemon-input'), {
      target: { value: 'pikachu' },
    });

    fireEvent.click(screen.getByTestId('search-pokemon-button'));

    await waitFor(() => {
      expect(saveDataInLSSpy).toHaveBeenCalledWith('inputValue', 'pikachu');
      expect(mockSearchPokemon).toHaveBeenCalledWith('pikachu');
    });
  });

  it('should be error when searchPokemon called twice with the same input value ', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    fireEvent.change(screen.getByTestId('search-pokemon-input'), {
      target: { value: 'pikachu' },
    });
    fireEvent.click(screen.getByTestId('search-pokemon-button'));
    fireEvent.click(screen.getByTestId('search-pokemon-button'));

    await waitFor(() => {
      expect(screen.getByText(/Enter another Pokemon Name/i)).toBeInTheDocument();
    });
  });

  it('should be resets state when clicked showAllPokemonList', async () => {
    render(
      <ControlBlock searchPokemon={mockSearchPokemon} showAllPokemonList={mockShowAllPokemon} />
    );

    fireEvent.click(screen.getByTestId('show-all-pokemon-button'));

    await waitFor(() => {
      expect(mockShowAllPokemon).toHaveBeenCalled();
      expect(screen.getByTestId('search-pokemon-input').getAttribute('value')).toBe('');
      expect(screen.queryByTestId('error-search-input')).not.toBeInTheDocument();
    });
  });
});
