import React, {useState, useEffect } from 'react';
import axios from '../api/axios.js';
import LoadingSpinner from '../Components/ui-states/loadingSmall.jsx';

const SearchBar = ({ handleTaskOpen }) => {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers : { Authorization : `Bearer ${token}`},
    }

    const fetchSearchResults = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/search?title=${searchInput}`, config);
            setSearchResults(response.data.slice(0, 3));
            setIsLoading(false);
        } catch {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [searchInput]);
  return (
    <>
      <input
       type='search'
       id='search-navbar'
       value={searchInput}
       autoComplete='off'
       onChange={(e) => setSearchInput(e.target.value)}
       className='block p-2 pl-4 w-full h-1/3 text-gray-900 bg-lightgray rounded-lg border border-gray-300 sm:text-sm focus:ring-lightgray focus:border-brightblue '
       placeholder='Search Task...'
    />

    {searchInput.length > 0 && (
        <ul className='fixed bg-white px-7 rounded-lg z-50 top-24 right-96 mr-3 w-1/3 drop-shadow-md'>
            {isLoading ? (
                <LoadingSpinner className='w-1 h-1' />
               ) : searchResults.length === 0 ? (<p className='text-sm text-darkblue italic py-5'>
                No tasks found
               </p>) : (
                 searchResults.map((result) => 
                    <li 
                     key={result._id}
                     className='border-b border-gray-400 pb-3 pt-3 cursor-pointer'
                     on
                     onClick={() => handleTaskOpen(result._id)}
                >
                    <p className='text-sm text-darkblue font-bold'>
                        {result.title}
                    </p>
                    <span className='text-xs text-gray pb-4'>
                        in {result.status}
                    </span>
                </li>
                )
            )}
        </ul>
       )}
    </>
  )
}

export default SearchBar
