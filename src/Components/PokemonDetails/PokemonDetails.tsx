import React from 'react';
import type { IPokemonData } from '../../services/pokemon.service.ts';

interface PokemonDetailsProps {
  detailsData: IPokemonData;
  onCloseDetails: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ detailsData, onCloseDetails }) => {
  return (
    <div
      className="sticky top-2 text-center w-full min-h-20 bg-white rounded-lg shadow-sm flex flex-col gap-1 p-3"
      style={{ boxShadow: `inset 9px 5px 82px -50px ${detailsData.color}` }}
    >
      <button
        className="outline-2 rounded-xl absolute right-1 top-1 cursor-pointer w-6 h-6 align-baseline"
        onClick={onCloseDetails}
      >
        X
      </button>
      <h2 className="text-xl font-semibold capitalize">{detailsData.name}</h2>
      <img
        src={detailsData.sprites.front_default}
        alt={detailsData.name}
        className="mx-auto min-h-24 rounded-sm max-h-30 animate-bounce"
      />
      <p>{detailsData.description}</p>
      <div className="flex gap-1 justify-center flex-wrap">
        {detailsData.types.map((t) => (
          <p
            key={'details-type-' + detailsData.name + Math.random()}
            className="bg-lime-200 rounded-xl p-2 inset-shadow-sm shadow-lime-200"
          >
            {t.type.name}
          </p>
        ))}
      </div>
      <p>Height: {detailsData.height}</p>
      <p>Weight: {detailsData.weight}</p>
      <p>Capture rate: {detailsData.weight}</p>
      <p>Base happiness: {detailsData.weight}</p>
      <p className="text-rose-400 animate-pulse">
        This is a {detailsData.isLegendary ? '' : 'not'} legendary{' '}
        {detailsData.isBaby ? 'baby' : 'adult'} Pokemon!
      </p>
    </div>
  );
};

export default PokemonDetails;
