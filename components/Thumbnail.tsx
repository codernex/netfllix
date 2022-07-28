import Image from 'next/image';
import React from 'react';
import { baseUrl } from '../utils/constants';

export const Thumbnail = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className='relative h-28 min-w-[180px] transition duration-200 ease-out
    md:h-36 md:min-w-[260px] md:hover:scale-105
    '
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className='rounded-sm object-cover md:rounded'
        layout='fill'
      />
    </div>
  );
};
