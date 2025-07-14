import React from 'react';
import Layout from '../Components/Layout/Layout.tsx';
import ControlBlock from '../Components/ControlBlock/ControlBlock.tsx';
import CardList from '../Components/CardList/CardList.tsx';
import {
  fetchPokemonData,
  type IPokemonBasicInfo,
  type IPokemonData,
} from '../utils/fetchPokemonData.ts';

export interface IPokemonListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonBasicInfo[];
}

interface homePageState {
  itemsList: IPokemonData[];
}

class HomePage extends React.Component {
  state: homePageState = {
    itemsList: [],
  };

  searchPokemon = async (pokemonData: IPokemonBasicInfo) => {
    const pokemonList: IPokemonData = await fetchPokemonData(pokemonData);

    this.setState({
      itemsList: [pokemonList],
    });
  };

  async componentDidMount() {
    try {
      const responsePokemonBasicInfo = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const pokemonBasicInfo: IPokemonListData = await responsePokemonBasicInfo.json();
      const pokemonList: IPokemonData[] = await Promise.all(
        pokemonBasicInfo.results.map((item: IPokemonBasicInfo) => fetchPokemonData(item))
      );

      this.setState({
        itemsList: pokemonList,
      });
    } catch (error) {
      console.error('Error with load pokemon:', error);
    }
  }

  render() {
    return (
      <Layout>
        <ControlBlock searchPokemon={this.searchPokemon} />
        <CardList itemsList={this.state.itemsList} />
      </Layout>
    );
  }
}

export default HomePage;
