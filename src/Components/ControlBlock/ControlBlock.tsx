import React, { type ChangeEvent, useEffect, useState } from 'react';
import ErrorButton from '../ErrorButton.tsx';
import { getDataFromLocalStorage, saveDataInLocalStorage } from '../../helpers/localStorage.ts';
import {
  fetchPokemonResponseData,
  type IPokemonBasicInfo,
  type IPokemonResponseData,
} from '../../services/pokemon.service.ts';

interface IState {
  allPokemon: IPokemonBasicInfo[];
  filteredPokemon: IPokemonBasicInfo[];
  inputValue: string;
  selectedPokemon: string | null;
  error: string;
}

interface IControlBlockProps {
  searchPokemon: (pokemonName: string) => void;
  showAllPokemonList: () => void;
}

const initialState: IState = {
  allPokemon: [],
  filteredPokemon: [],
  inputValue: '',
  selectedPokemon: null,
  error: '',
};

const ControlBlock: React.FC<IControlBlockProps> = ({ searchPokemon, showAllPokemonList }) => {
  const [state, setState] = useState<IState>(initialState);

  useEffect(() => {
    const getAllPokemonList = async () => {
      try {
        const allPokemonData: IPokemonResponseData = await fetchPokemonResponseData(100000);
        const storageData = getDataFromLocalStorage('inputValue');
        setState((prevState: IState) => ({
          ...prevState,
          allPokemon: allPokemonData.results,
          inputValue: storageData ?? '',
        }));
      } catch (error) {
        console.log('Error loading list of Pokemon for helping search:', error);
      }
    };

    getAllPokemonList();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const filteredPokemon = state.allPokemon
      .filter((p) => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .slice(0, 15);

    setState((prevState: IState) => ({
      ...prevState,
      inputValue: inputValue,
      filteredPokemon: inputValue ? filteredPokemon : [],
      selectedPokemon: null,
      error: '',
    }));
  };

  const selectProposedOption = (name: string) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: name,
      filteredPokemon: [],
    }));
  };

  const handleSearch = () => {
    saveDataInLocalStorage('inputValue', state.inputValue);
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
      filteredPokemon: [],
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
      filteredPokemon: [],
    }));
  };

  const { inputValue, filteredPokemon, error } = state;

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

        {filteredPokemon.length > 0 && (
          <ul className="border rounded max-h-60 overflow-y-auto bg-white shadow">
            {filteredPokemon.map((p) => (
              <li
                key={'filteredPokemon-' + p.name}
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
        <button
          data-testid="show-all-pokemon-button"
          className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={showAllPokemon}
        >
          Show All Pokemon
        </button>
        <ErrorButton />
      </div>
    </div>
  );
};

export default ControlBlock;
