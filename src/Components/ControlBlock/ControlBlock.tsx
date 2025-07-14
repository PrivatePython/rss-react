import React, { type ChangeEvent } from 'react';
import type { IPokemonListData } from '../../pages/HomePage.tsx';
import type { IPokemonBasicInfo } from '../../utils/fetchPokemonData.ts';
import ErrorButton from '../ErrorButton.tsx';
import { getDataFromLS, saveDataInLS } from '../../helpers/localStorage.ts';

interface PokemonBasic {
  name: string;
  url: string;
}

interface PokemonFull {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
}

interface State {
  allPokemon: PokemonBasic[];
  filteredPokemon: PokemonBasic[];
  inputValue: string;
  selectedPokemon: PokemonFull | null;
  error: string;
}

class ControlBlock extends React.Component<
  { searchPokemon: (pokemonData: IPokemonBasicInfo[]) => void },
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
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      const allPokemonData: IPokemonListData = await response.json();
      const storageData = getDataFromLS('inputValue');
      this.setState({
        allPokemon: allPokemonData.results,
        inputValue: storageData ?? '',
      });
    } catch (error) {
      console.log('Error loading list of Pokemon', error);
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

    if (name === this.state.selectedPokemon?.name) {
      this.setState({ error: 'Enter another Pokemon Name' });
      return;
    }

    this.setState({ error: '', selectedPokemon: null });

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error('Pokemon not found');
        return res.json();
      })
      .then((data: PokemonFull) => {
        this.setState({ selectedPokemon: data });
        this.props.searchPokemon([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
          },
        ]);
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  showAllPokemon = () => {
    this.props.searchPokemon(this.state.allPokemon.slice(0, 20));
    this.setState({ selectedPokemon: null, error: '' });
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
