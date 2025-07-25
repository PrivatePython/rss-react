import React from 'react';
import CardItem from '../CardItem/CardItem.tsx';
import type { IPokemonData } from '../../services/pokemon.service.ts';

interface ICardListProps {
  itemsList: IPokemonData[];
}

const CardList: React.FC<ICardListProps> = ({ itemsList }) => {
  console.log(itemsList);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] grid-flow-dense gap-2">
      {itemsList.map((item) => {
        return <CardItem key={'cardItem-' + item.id} pokemonData={item} />;
      })}
    </div>
  );
};

export default CardList;
