import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader.tsx';
import { fetchPokemonData, type IPokemonData } from '../services/pokemon.service.ts';
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails.tsx';

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
      setIsLoading(true);
      const getPokemonData = async () => {
        try {
          const data = await fetchPokemonData({
            name: 'name',
            url: `https://pokeapi.co/api/v2/pokemon/${detail}`,
          });
          setPokemonData(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          navigate('/not-found');
        } finally {
          setIsLoading(false);
        }
      };
      getPokemonData();
    }
  }, [detail]);

  const onCloseDetails = () => {
    navigate(`/${page}`);
  };

  return (
    <div className="relative w-full h-full min-w-xs max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
      {isLoading && <Loader className="sticky top-0 max-h-screen" />}
      {!isLoading && pokemonData && (
        <PokemonDetails detailsData={pokemonData} onCloseDetails={onCloseDetails} />
      )}
    </div>
  );
};

export default CardDetailPage;
