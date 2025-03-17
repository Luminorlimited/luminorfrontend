'use client'
import NotFoundAnimation from '@/components/NotFoundAnimation';
import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';

const NotFound = () => {
  return (
    <div>
      <Navbar/>

      <div className='flex justify-center items-center min-h-screen'>
        <NotFoundAnimation />

      </div>
    </div>
  );
};

export default NotFound;
