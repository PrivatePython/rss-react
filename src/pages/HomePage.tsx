import React, { useEffect, useState } from 'react';
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
const initialHomePageState = {
  itemsList: [],
  isLoading: true,
  error: null,
};

const HomePage: React.FC = () => {
  const [state, setState] = useState<IHomePageState>(initialHomePageState);

  useEffect(() => {
    showAllPokemonList().then();
  }, []);

  const showAllPokemonList = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const pokemonResponseData = await fetchPokemonResponseData();
      const pokemonList = await fetchPokemonDataList(pokemonResponseData.results);
      setState({
        itemsList: pokemonList,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const err = error as Error;
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: `Error with load pokemon: ${err.message}`,
      }));
    }
  };

  const searchPokemon = async (pokemonName: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const pokemonData: IPokemonData = await fetchPokemonData({
        name: pokemonName,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      });
      setState({
        itemsList: [pokemonData],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        error: 'Pokemon Not Found!',
        isLoading: false,
      }));
    }
  };

  return (
    <Layout isLoading={state.isLoading}>
      <ControlBlock searchPokemon={searchPokemon} showAllPokemonList={showAllPokemonList} />
      {state.error && <h4 className="mt-3">{state.error}</h4>}
      {!state.error && <CardList itemsList={state.itemsList} />}
    </Layout>
  );
};

export default HomePage;
