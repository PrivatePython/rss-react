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
import PaginationBlock from '../Components/PaginationBlock/PaginationBlock.tsx';

interface IHomePageState {
  itemsList: IPokemonData[];
  isLoading: boolean;
  error: string | null;
  totalPageCount: number;
  currentPage: number;
  limit: number;
}

const initialHomePageState = {
  itemsList: [],
  isLoading: true,
  error: null,
  totalPageCount: 0,
  currentPage: 1,
  limit: 20,
};

const HomePage: React.FC = () => {
  const [state, setState] = useState<IHomePageState>(initialHomePageState);

  useEffect(() => {
    showPokemonListOfCurrentPage().then();
  }, []);

  const showPokemonListOfCurrentPage = async (page: number = 1) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const pokemonResponseData = await fetchPokemonResponseData(state.limit, page * state.limit);
      const pokemonList = await fetchPokemonDataList(pokemonResponseData.results);
      const totalPageCount = Math.ceil(pokemonResponseData.count / state.limit);
      setState((prevState) => ({
        ...prevState,
        itemsList: pokemonList,
        isLoading: false,
        error: null,
        totalPageCount,
        currentPage: page,
      }));
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

      setState((prevState) => ({
        ...prevState,
        itemsList: [pokemonData],
        isLoading: false,
        error: null,
        totalPageCount: 0,
      }));
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        error: 'Pokemon Not Found!',
        isLoading: false,
      }));
    }
  };
  const changePage = async (page: number) => {
    await showPokemonListOfCurrentPage(page);
  };

  return (
    <Layout isLoading={state.isLoading}>
      <ControlBlock
        searchPokemon={searchPokemon}
        showAllPokemonList={showPokemonListOfCurrentPage}
      />
      {state.error && <h4 className="mt-3">{state.error}</h4>}
      {!state.error && (
        <>
          <CardList itemsList={state.itemsList} />
          {!!state.totalPageCount && (
            <PaginationBlock
              changePage={changePage}
              currentPage={state.currentPage}
              totalPageCount={state.totalPageCount}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
