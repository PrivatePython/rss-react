import React, { useEffect } from 'react';
import ControlBlock from '../Components/ControlBlock/ControlBlock.tsx';
import CardList from '../Components/CardList/CardList.tsx';
import PaginationBlock from '../Components/PaginationBlock/PaginationBlock.tsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader.tsx';
import { useAppSelector, useAppDispatch } from '../store/store.ts';
import { loadPokemonListForPage, searchPokemonByName } from '../store/slices/pokemon.slice.ts';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, error, itemsList, totalPageCount, currentPage } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    if (
      page &&
      !page.startsWith('0') &&
      !Number.isNaN(Number(page)) &&
      Number.isInteger(Number(page))
    ) {
      dispatch(loadPokemonListForPage(Number(page)))
        .unwrap()
        .catch((error: string) => {
          if (error === 'Invalid page') {
            navigate('/not-found', { replace: true });
          }
        });
    } else {
      navigate('/not-found', { replace: true });
    }
  }, [page]);

  const searchPokemon = (pokemonName: string) => {
    dispatch(searchPokemonByName(pokemonName));
  };
  const showPokemonListOfCurrentPage = () => {
    navigate('/1');
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex gap-2  items-center">
        <div className="grow overflow-y-auto flex flex-col items-center gap-2">
          <ControlBlock
            searchPokemon={searchPokemon}
            showAllPokemonList={showPokemonListOfCurrentPage}
          />
          {error && <h4 className="mt-3">{error}</h4>}
          {!error && (
            <>
              <CardList itemsList={itemsList} />
              {!!totalPageCount && (
                <PaginationBlock currentPage={currentPage} totalPageCount={totalPageCount} />
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
