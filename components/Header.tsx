import React, { useEffect } from 'react';
import { SearchIcon, BellIcon } from '@heroicons/react/outline';
import { useAuth } from '../hooks';

export const Header: React.FC = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'bg-[#141414]' : ''}>
      <div className='flex space-x-2 items-center md:space-x-10'>
        <img
          src='https://rb.gy/ulxxee'
          width={100}
          height={100}
          className='cursor-pointer object-contain'
        />
        <ul className='hidden md:flex space-x-4'>
          <li className='nav-link cursor-default text-white hover:text-white'>
            Home
          </li>
          <li className='nav-link'>TV shows</li>
          <li className='nav-link'>Movies</li>
          <li className='nav-link'>New & Popular</li>
          <li className='nav-link'>My Lists</li>
        </ul>
      </div>
      <div className='text-sm flex items-center font-light space-x-4'>
        <SearchIcon className='sm hidden w-6 h-6 sm:inline' />
        <span className='hidden lg:inline'>Kids</span>
        <BellIcon className='sm hidden w-6 h-6 sm:inline' />
        <img
          src='https://rb.gy/g1pwyx'
          alt=''
          className='cursor-pointer rounded-full'
          onClick={() => logout()}
        />
      </div>
    </header>
  );
};
