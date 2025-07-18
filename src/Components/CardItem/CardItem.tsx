import React from 'react';
import type { IPokemonData } from '../../services/pokemon.service.ts';

interface ICardItemProps {
  pokemonData: IPokemonData;
}

class CardItem extends React.Component<ICardItemProps> {
  render() {
    const { pokemonData } = this.props;
    return (
      <>
        <div
          className="text-center w-full min-h-20 bg-white rounded-lg shadow-sm flex flex-col gap-1 p-3"
          style={{ boxShadow: `inset 9px 5px 82px -50px ${pokemonData.color}` }}
        >
          <h2 className="text-xl font-semibold capitalize">{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="mx-auto" />
          <p>{pokemonData.description}</p>
          <div className="flex gap-1 justify-center">
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
        </div>
      </>
    );
  }
}

export default CardItem;
