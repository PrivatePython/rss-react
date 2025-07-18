import React from 'react';
import Layout from '../Components/Layout/Layout.tsx';
import ControlBlock from '../Components/ControlBlock/ControlBlock.tsx';
import CardList from '../Components/CardList/CardList.tsx';
import {
  fetchPokemonData,
  fetchPokemonDataList,
  fetchPokemonResponseData,
  type IPokemonData,
} from '../services/pokemon.service.ts';

interface IHomePageState {
  itemsList: IPokemonData[];
  isLoading: boolean;
  error: string | null;
}

class HomePage extends React.Component {
  state: IHomePageState = {
    itemsList: [],
    isLoading: true,
    error: null,
  };

  showAllPokemonList = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const pokemonResponseData = await fetchPokemonResponseData();
      const pokemonList = await fetchPokemonDataList(pokemonResponseData.results);
      this.setState({
        itemsList: pokemonList,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const err = error as Error;
      this.setState({
        isLoading: false,
        error: `Error with load pokemon: ${err.message}`,
      });
    }
  };

  searchPokemon = async (pokemonName: string) => {
    try {
      this.setState({
        isLoading: true,
      });
      const pokemonData: IPokemonData = await fetchPokemonData({
        name: pokemonName,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      });
      this.setState({
        itemsList: [pokemonData],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: 'Pokemon Not Found!',
        isLoading: false,
      });
    }
  };

  async componentDidMount() {
    await this.showAllPokemonList();
  }

  render() {
    return (
      <Layout isLoading={this.state.isLoading}>
        <ControlBlock
          searchPokemon={this.searchPokemon}
          showAllPokemonList={this.showAllPokemonList}
        />
        {this.state.error && <h4 className="mt-3">{this.state.error}</h4>}
        {!this.state.error && <CardList itemsList={this.state.itemsList} />}
      </Layout>
    );
  }
}

export default HomePage;
