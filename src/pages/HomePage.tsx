import React, { useEffect, useState } from 'react';
import ControlBlock from '../Components/ControlBlock/ControlBlock.tsx';
import CardList from '../Components/CardList/CardList.tsx';
import {
  fetchPokemonData,
  fetchPokemonDataList,
  fetchPokemonResponseData,
  type IPokemonData,
} from '../services/pokemon.service.ts';
import PaginationBlock from '../Components/PaginationBlock/PaginationBlock.tsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader.tsx';

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
  const navigate = useNavigate();
  const { page } = useParams();
  const [state, setState] = useState<IHomePageState>(() => ({
    ...initialHomePageState,
  }));

  useEffect(() => {
    if (
      page &&
      !page.startsWith('0') &&
      !Number.isNaN(Number(page)) &&
      Number.isInteger(Number(page))
    ) {
      showPokemonListOfCurrentPage(Number(page));
    } else {
      navigate('/not-found', { replace: true });
    }
  }, [page]);

  const showPokemonListOfCurrentPage = async (page: number = 1) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const pokemonResponseData = await fetchPokemonResponseData(state.limit, page * state.limit);
      const pokemonList = await fetchPokemonDataList(pokemonResponseData.results);
      const totalPageCount = Math.floor(pokemonResponseData.count / state.limit);
      if (page > totalPageCount || page < 1) {
        navigate('/not-found', { replace: true });
        return;
      }
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
      console.error('Error', error);
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

  return (
    <>
      {state.isLoading && <Loader />}
      <div className="flex gap-2  items-center">
        <div className="grow overflow-y-auto flex flex-col items-center gap-2">
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
                  currentPage={state.currentPage}
                  totalPageCount={state.totalPageCount}
                />
              )}
            </>
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
