import SearchBar from './SearchBar';
import React from 'react'

const Header = ({ firstName, handleTaskOpen }) => {
const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
};

const now = new Date().toLocaleDateString('default', options);
  return (
    <>
      <header className='flex flex-col pt-8 pl-80 pr-8 bg-white fixed w-full border-4 border-white z-20'>
        <nav className='bg-white border-lightgray px-8 sm:px-4 py-2.5 rounded'>
            <div className='container flex flex-row justify-between items-center mx-auto'>
                <div>
                    <p className='text-2xl font-semibold whitespace-nowrap text-black'>
                        Hi, {firstName}
                    </p>
                    <p className='text-xs opacity-50 pt-2'>Today is {now}.</p>
                </div>
                <div className='flex flex-row itmes-center justify-end w-3/4'>
                   <SearchBar handleTaskOpen={handleTaskOpen} />
                </div>
            </div>
        </nav>
      </header>
    </>
  );
};

export default Header