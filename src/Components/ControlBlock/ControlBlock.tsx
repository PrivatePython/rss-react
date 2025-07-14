import React, { type ChangeEvent } from 'react';
import type { IPokemonListData } from '../../pages/HomePage.tsx';
import type { IPokemonBasicInfo } from '../../utils/fetchPokemonData.ts';

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
  { searchPokemon: (pokemonData: IPokemonBasicInfo) => void },
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
      this.setState({ allPokemon: allPokemonData.results });
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
    const name = this.state.inputValue.trim().toLowerCase();

    if (!name) {
      this.setState({ error: 'Enter The Pokemon Name' });
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
        this.props.searchPokemon({
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        });
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const {
      inputValue,
      filteredPokemon,
      // selectedPokemon,
      error,
    } = this.state;

    return (
      <div className="max-w-2xl w-full mx-auto p-4 bg-white rounded-2xl shadow space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            placeholder="Type a name (for example, Bulba)"
            className="w-full p-2 border rounded"
          />
          <button onClick={this.handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
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
    );
  }
}

export default ControlBlock;
