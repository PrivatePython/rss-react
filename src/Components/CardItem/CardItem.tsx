import React from 'react';
import type { IPokemonData } from '../../services/pokemon.service.ts';
import { useNavigate, useParams } from 'react-router-dom';

interface ICardItemProps {
  pokemonData: IPokemonData;
}

const CardItem: React.FC<ICardItemProps> = ({ pokemonData }) => {
  const { page } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer text-center w-full min-h-20 backdrop-blur-sm rounded-lg shadow-sm flex flex-col gap-1 p-3"
      style={{ boxShadow: `inset 9px 5px 82px -50px ${pokemonData.color}` }}
      onClick={() => {
        if (pokemonData.name === 'Pavel Putyrski') return;
        const match = pokemonData.species.url.match(/(\d+)\/$/);
        const detail = match ? match[1] : null;
        navigate(`/${page}/${detail}`);
      }}
    >
      <h2 className="text-xl font-semibold capitalize">{pokemonData.name}</h2>
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        className="mx-auto min-h-24 rounded-sm max-h-30"
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
    </div>
  );
};

export default CardItem;
