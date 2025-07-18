import React, { type ChangeEvent } from 'react';
import ErrorButton from '../ErrorButton.tsx';
import { getDataFromLS, saveDataInLS } from '../../helpers/localStorage.ts';
import {
  fetchPokemonResponseData,
  type IPokemonBasicInfo,
  type IPokemonResponseData,
} from '../../services/pokemon.service.ts';

interface State {
  allPokemon: IPokemonBasicInfo[];
  filteredPokemon: IPokemonBasicInfo[];
  inputValue: string;
  selectedPokemon: string | null;
  error: string;
}

class ControlBlock extends React.Component<
  {
    searchPokemon: (pokemonName: string) => void;
    showAllPokemonList: () => void;
  },
  State
> {
  state: State = {
    allPokemon: [],
    filteredPokemon: [],
    inputValue: '',
    selectedPokemon: null,
    error: '',
  };

  async componentDidMount() {
    try {
      const allPokemonData: IPokemonResponseData = await fetchPokemonResponseData(100000);
      const storageData = getDataFromLS('inputValue');
      this.setState({
        allPokemon: allPokemonData.results,
        inputValue: storageData ?? '',
      });
    } catch (error) {
      console.log('Error loading list of Pokemon for helping search:', error);
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const filteredPokemon = this.state.allPokemon
      .filter((p) => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .slice(0, 15);

    this.setState({
      inputValue: inputValue,
      filteredPokemon: inputValue ? filteredPokemon : [],
      selectedPokemon: null,
      error: '',
    });
  };

  selectProposedOption = (name: string) => {
    this.setState({
      inputValue: name,
      filteredPokemon: [],
    });
  };

  handleSearch = () => {
    saveDataInLS('inputValue', this.state.inputValue);
    const name = this.state.inputValue.trim().toLowerCase();

    if (!name) {
      this.setState({ error: 'Enter The Pokemon Name' });
      return;
    }

    if (name === this.state.selectedPokemon?.toLowerCase()) {
      this.setState({ error: 'Enter another Pokemon Name' });
      return;
    }

    this.setState({ error: '', selectedPokemon: name, filteredPokemon: [] });

    this.props.searchPokemon(name);
  };

  showAllPokemon = () => {
    this.props.showAllPokemonList();
    this.setState({ selectedPokemon: null, error: '', inputValue: '', filteredPokemon: [] });
  };

  render() {
    const { inputValue, filteredPokemon, error } = this.state;

    return (
      <div className="flex flex-col gap-1 w-full max-w-2xl">
        <div className="w-full mx-auto p-4 bg-white rounded-2xl shadow space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Type a name (for example, Bulba)"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={this.handleSearch}
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
                  onClick={() => this.selectProposedOption(p.name)}
                  className="p-2 hover:bg-blue-100 cursor-pointer capitalize"
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] grid-flow-dense gap-2">
          <button
            className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={this.showAllPokemon}
          >
            Show All Pokemon
          </button>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default ControlBlock;
