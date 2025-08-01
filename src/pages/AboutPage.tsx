import React from 'react';
import type { IPokemonData } from '../services/pokemon.service.ts';
import CardItem from '../Components/CardItem/CardItem.tsx';

const technologies = ['TypeScript', 'React', 'TailwindCSS', 'Vitest', 'Vite'];

const developerCard: IPokemonData = {
  id: 90909,
  name: 'Pavel Putyrski',
  height: 181,
  weight: 90,
  description:
    'I am a frontend developer, my programming experience is more than 2 years, this year I completed the JavaScript course at Rolling Scopes Schools, and now I continue my studies',
  color: 'red',
  sprites: { front_default: '/photo-pavel-sprite.png' },
  species: {
    name: '',
    url: '',
  },
  types: [
    { type: { name: 'JavaScript' } },
    { type: { name: 'TypeScript' } },
    { type: { name: 'React' } },
    { type: { name: 'CSS' } },
    { type: { name: 'HTML' } },
    { type: { name: 'UI Library' } },
    { type: { name: 'and more...' } },
  ],
  gender: 'male',
  captureRate: 20,
  baseHappiness: 80,
  isLegendary: true,
  isBaby: false,
};

const AboutPage: React.FC = () => {
  return (
    <div className="self-center max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About This App</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to the Pokémon Application! This project was created as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer underline text-lg text-red-500"
        >
          Rolling Scopes School React course.
        </a>
      </p>

      <div className="flex max-w-75 justify-center items-center mx-auto  mb-4">
        <CardItem pokemonData={developerCard} />
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This project was built using technologies: TypeScript, React, Tailwind, Vitest and Vite
      </p>
      <div className="flex gap-1 justify-center flex-wrap">
        {technologies.map((technology, index) => (
          <p
            key={'about-technologies-' + index}
            className="bg-lime-200 rounded-xl p-2 inset-shadow-sm shadow-lime-200"
          >
            {technology}
          </p>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="https://github.com/PrivatePython/rss-react"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
