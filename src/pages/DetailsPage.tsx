import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader.tsx';
import { fetchPokemonData, type IPokemonData } from '../services/pokemon.service.ts';

const CardDetailPage: React.FC = () => {
  const { detail, page } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !detail ||
      (detail.startsWith('0') && Number.isNaN(detail) && !Number.isInteger(Number(detail)))
    ) {
      navigate('/not-found');
      return;
    } else {
      fetchPokemonData({
        name: 'name',
        url: `https://pokeapi.co/api/v2/pokemon/${detail}`,
      })
        .then((data) => {
          setPokemonData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          navigate('/not-found');
        });
    }
  }, [detail]);

  if (!pokemonData) return null;

  return (
    <div className="h-full max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div
            className="sticky top-2/8 text-center w-full min-h-20 bg-white rounded-lg shadow-sm flex flex-col gap-1 p-3"
            style={{ boxShadow: `inset 9px 5px 82px -50px ${pokemonData.color}` }}
          >
            <button
              className="outline-2 rounded-xl absolute right-1 top-1 cursor-pointer w-6 h-6 align-baseline"
              onClick={() => {
                navigate(`/${page}`);
              }}
            >
              X
            </button>
            <h2 className="text-xl font-semibold capitalize">{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="mx-auto min-h-24 rounded-sm max-h-30 animate-bounce"
            />
            <p>{pokemonData.description}</p>
            <div className="flex gap-1 justify-center flex-wrap">
              {pokemonData.types.map((t) => (
                <p
                  key={'type-' + pokemonData.name + Math.random()}
                  className="bg-lime-200 rounded-xl p-2 inset-shadow-sm shadow-lime-200"
                >
                  {t.type.name}
                </p>
              ))}
            </div>
            <p>Height: {pokemonData.height}</p>
            <p>Weight: {pokemonData.weight}</p>
            <p>Capture rate: {pokemonData.weight}</p>
            <p>Base happiness: {pokemonData.weight}</p>
            <p className="text-rose-400 animate-pulse">
              This is a {pokemonData.is_legendary ? '' : 'not'} legendary{' '}
              {pokemonData.is_baby ? 'baby' : 'adult'} Pokemon!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardDetailPage;
