import { async } from '@firebase/util';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../hooks';

interface Input {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState<boolean>(false);
  const { err, loading, logout, signIn, signUp, user } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div
      className='relative w-screen h-screen bg-black flex flex-col md:items-center
    md:justify-center md:bg-transparent'
    >
      <Head>
        <title>Login - Netflix</title>
        <link rel='icon' href='./favicon.ico' />
      </Head>
      <Image
        src='https://rb.gy/p2hphi'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />
      <Link href={'/'}>
        <img
          src='https://rb.gy/ulxxee'
          className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
          width={150}
          height={150}
        />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative space-y-8 mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        autoComplete='off'
      >
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label htmlFor='' className='inline-block w-full'>
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='Email'
              className='input'
            />
            {errors.email && (
              <span className='text-orange-500 p-1 text-[13px] font-light'>
                Please Enter a valid email
              </span>
            )}
          </label>
          <label htmlFor='' className='inline-block w-full'>
            <input
              {...register('password', { required: true })}
              type='text'
              placeholder='Password'
              className='input'
            />
            {errors.password && (
              <span className='text-orange-500 p-1 text-[13px] font-light'>
                Please Enter a Password
              </span>
            )}
          </label>
        </div>

        {err && (
          <span className='text-orange-500 p-1 text-[13px] font-light'>
            {err.message}
          </span>
        )}

        <button
          onClick={() => setLogin(true)}
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
        >
          Sign In
        </button>
        <div className='text-[gray]'>
          New to Netflix?{' '}
          <button className='ml-2 text-white hover:underline'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default login;
