import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import { Thumbnail } from './Thumbnail';

type Props = {
  title: string;
  movies: Movie[];
};

export const Row: React.FC<Props> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [isMoved, setIsMoved] = useState<boolean>(false);

  const handleMove = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 md:text-2xl'>
        {title}
      </h2>
      <div className='group relative -ml-2 '>
        <ChevronLeftIcon
          onClick={() => handleMove('left')}
          className={`top-0 opacity-0 bottom-0 left-2 z-40 m-auto h-9 w-9 absolute cursor-pointer transition hover:scale-125 group-hover:opacity-100
          ${!isMoved && 'hidden'}
          `}
        />
        <div
          ref={rowRef}
          className='flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2 '
        >
          {movies.map((movie, index) => {
            return <Thumbnail key={index} movie={movie} />;
          })}
        </div>
        <ChevronRightIcon
          onClick={() => handleMove('right')}
          className='top-0 opacity-0  bottom-0 right-2 z-40 m-auto h-9 w-9 absolute cursor-pointer transition hover:scale-125 group-hover:opacity-100'
        />
      </div>
    </div>
  );
};
