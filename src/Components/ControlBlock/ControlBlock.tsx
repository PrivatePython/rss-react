import React, { type ChangeEvent, useEffect, useState } from 'react';
import ErrorButton from '../ErrorButton.tsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.hooks.ts';
import {
  fetchPokemonResponseData,
  type IPokemonBasicInfo,
  type IPokemonResponseData,
} from '../../services/pokemon.service.ts';
import BaseButton from '../BaseButton/BaseButton.tsx';

interface IState {
  allSuggestionsPokemonList: IPokemonBasicInfo[];
  filteredSuggestionsPokemonList: IPokemonBasicInfo[];
  inputValue: string;
  selectedPokemon: string | null;
  error: string;
}

interface IControlBlockProps {
  searchPokemon: (pokemonName: string) => void;
  showAllPokemonList: (limit?: number, offset?: number) => void;
}

const initialState: IState = {
  allSuggestionsPokemonList: [],
  filteredSuggestionsPokemonList: [],
  inputValue: '',
  selectedPokemon: null,
  error: '',
};

const ControlBlock: React.FC<IControlBlockProps> = ({ searchPokemon, showAllPokemonList }) => {
  const [storageData, saveStorageData] = useLocalStorage<string>('inputValue');
  const [state, setState] = useState<IState>({ ...initialState, inputValue: storageData ?? '' });

  useEffect(() => {
    const getAllSuggestionsPokemonList = async () => {
      try {
        const allPokemonData: IPokemonResponseData = await fetchPokemonResponseData(100000);
        setState((prevState: IState) => ({
          ...prevState,
          allSuggestionsPokemonList: allPokemonData.results,
        }));
      } catch (error) {
        let errorMessage = 'Error loading list of Pokemon for helping search: ';
        console.error(errorMessage, error);
        if (error instanceof Error) {
          errorMessage += error.message;
        }
        setState((prevState: IState) => ({
          ...prevState,
          error: errorMessage,
        }));
      }
    };

    getAllSuggestionsPokemonList();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const filteredSuggestionsPokemonList = state.allSuggestionsPokemonList
      .filter((p) => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .slice(0, 15);

    setState((prevState: IState) => ({
      ...prevState,
      inputValue: inputValue,
      filteredSuggestionsPokemonList: inputValue ? filteredSuggestionsPokemonList : [],
      selectedPokemon: null,
      error: '',
    }));
  };

  const selectProposedOption = (name: string) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: name,
      filteredSuggestionsPokemonList: [],
    }));
  };

  const handleSearch = () => {
    saveStorageData(state.inputValue);
    const name = state.inputValue.trim().toLowerCase();

    if (!name) {
      setState((prevState) => ({ ...prevState, error: 'Enter The Pokemon Name' }));
      return;
    }

    if (name === state.selectedPokemon?.toLowerCase()) {
      setState((prevState) => ({ ...prevState, error: 'Enter another Pokemon Name' }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      error: '',
      selectedPokemon: name,
      filteredSuggestionsPokemonList: [],
    }));

    searchPokemon(name);
  };

  const showAllPokemon = () => {
    showAllPokemonList();
    setState((prevState) => ({
      ...prevState,
      selectedPokemon: null,
      error: '',
      inputValue: '',
      filteredSuggestionsPokemonList: [],
    }));
  };

  const { inputValue, filteredSuggestionsPokemonList, error } = state;

  return (
    <div className="flex flex-col gap-1 w-full max-w-2xl">
      <div className="w-full mx-auto p-4 bg-white rounded-2xl shadow space-y-4">
        <div className="flex gap-2">
          <input
            data-testid="search-pokemon-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a name (for example, Bulba)"
            className="w-full p-2 border rounded"
          />
          <button
            data-testid="search-pokemon-button"
            onClick={handleSearch}
            className="cursor-pointer rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Поиск
          </button>
        </div>

        {filteredSuggestionsPokemonList.length > 0 && (
          <ul className="border rounded max-h-60 overflow-y-auto bg-white shadow">
            {filteredSuggestionsPokemonList.map((p) => (
              <li
                key={'filtered-suggestions-pokemon-key-' + p.name}
                onClick={() => selectProposedOption(p.name)}
                className="p-2 hover:bg-blue-100 cursor-pointer capitalize"
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p data-testid="error-search-input" className="text-red-500 text-center">
            {error}
          </p>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] grid-flow-dense gap-2">
        <BaseButton data-testid="show-all-pokemon-button" onClick={showAllPokemon}>
          Show All Pokemon
        </BaseButton>
        <ErrorButton />
      </div>
    </div>
  );
};

export default ControlBlock;
