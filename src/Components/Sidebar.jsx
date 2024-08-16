import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios.js';

import LoadingSpinner from '../Components/ui-states/loadingSpinner.jsx';
import dashIcon from '../assets/icon/dashboard-icon.svg';
import sortIcon from '../assets/icon/sort-icon.svg';
import filterIcon from '../assets/icon/filter-icon.svg';
import logoutIcon from '../assets/icon/logout-icon.svg';
import FocusZonelogo  from '../assets/icon/title-icon.png';
import defaultPhoto from '../assets/icon/default-displayphoto.svg';

const Sidebar = ({
    priorityFilter,
    setPriorityFilter,
    sort,
    setSort,
    sortOldest,
    sortDueDate,
    setProfileModalOpen,
    firstName,
    lastName,
    email,
    userImage,
}) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);

    const handleModalOpen = () => {
        setProfileModalOpen(true);
    };

    const handleLogout = () => {
        setLoading(true);
        try{
            localStorage.removeItem('token');
            navigate('/login');
            setLoading(false);
        } catch (error) {
           setLoading(false)
           console.log(error);
        }
    };

    const toggleSortDropdown = () => {
        setToggleSort(!toggleSort);
    };

    const toggleFilterDropdown = () => {
     setToggleFilter(!toggleFilter);
    };

    const handleFilterSelected = (label) => {
        const isSelected = priorityFilter.includes(label);
        setPriorityFilter(
            isSelected
            ? priorityFilter.filter((item) => item !== label)
            : [...priorityFilter, label]
        );
    };
    
    const handleSortSelected = (label) => {
        const isSelected = sort.includes(label);
        setSort(isSelected ? 'newest' : label);
    };

    const sortItems = [
        { id:1, label: 'Oldest Added', function: sortOldest, sortLabel:'oldest' },
        {
            id:2,
            label: 'Sort by Due Date',
            function: sortDueDate,
            sortLabel:'duedate',
        },
    ];

    const filterItems = [
        {
            id: 1,
            label: 'Low Priority',
        },
        {
            id:2,
            label: 'Medium Priority',
        },
        {
            id:3,
            label: 'High Priority',
        },
        { id:4, label: 'Urgent'},
    ];

    return (
        <aside className="w-72 fixed z-30" aria-label="Sidebar">
            <div className="h-screen overflow-y-auto py-4 px-8 bg-brightblue">
                <ul className="space-y-2">
                  <li id='logo'>
                    <img src={FocusZonelogo} className="w-2/3 h-auto pt-14 pb-8" />
                  </li>
                </ul>
                <li className="flex items-center space-x-4 pb-2" id='user-info'>
                    <img src={userImage} className="w-10 h-10 rounded-full border-4 border-white object-cover"
                    />
                    <div className="space-y-1">
                        <div className="font-bold text-white text-base">
                            {firstName} {lastName}
                        </div>
                        <div className="text-sm text-white">{email}</div>
                    </div>
                </li>
                <li className="flex items-center pl-14 pb-8">
                    <button
                      className="text-xs bg-lightgray font-bold py-1 px-3 rounded-lg text-grey border border-lightgray text-center hover:opacity-80 self-center my-auto"
                      onClick={handleModalOpen}
                    >
                        Edit Profile
                    </button>
                </li>
                    <a 
                    href='/dashboard'
                    className="flex items-center text-base font-normal text-white rounded-full hover:bg-darkerblue px-7 py-2 active:bg-darkerbule w-full"
                    >
                        <img 
                          src={dashIcon}
                          className="w-4 h-4 text-white transition duration-75"
                        />
                        <span className="ml-3">Dashboard</span>
                    </a>
                    <br/>
                    <button
                     type='button'
                     className="flex items-center text-base font-normal text-white rounded-full hover:bg-darkerblue px-7 py-2 w-full"
                     onClick={toggleSortDropdown}
                    >
                        <img 
                         src={sortIcon}
                         className="w-4 h-4 text-white transition duration-75"
                        />
                         <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            Sort
                         </span>
                         <svg
                         className='w-7 h-7 pl-2 pt-1'
                         fill='currentColor'
                         viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                        >
                            <path 
                             fillRule='evenodd'
                             d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                             clipRule='evenodd'
                            ></path>
                        </svg>
                    </button>
                    {toggleSort && (
                        <ul className="py-2 space-y-2">
                            {sortItems.map((item) => (
                                <li 
                                 className={`flex justify-between w-full hover:bg-darkerblue rounded-full pt-2 pr-7 pb-2 opacity-70 ${
                                    sort === item.sortLabel
                                    ? 'bg-darkblue'
                                    : 'bg-transparent'
                                 }`}
                                 key={item.id}
                                 onClick={() => item.function()}
                                >
                                    <label
                                     htmlFor={item.id}
                                     className="text-xs font-normal text-white cursor-pointer pl-9"
                                    >
                                        {item.label}
                                    </label>
                                    <input
                                      type='checkbox'
                                      name={item.label}
                                      value={item.label}
                                      className="checkbox focus:ring-0"
                                      checked={sort.includes(item.sortLabel)}
                                      key={item.id}
                                      onChange={() => handleSortSelected(item.sortLabel)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <br/>
                    <button
                     type='button'
                     className="flex items-center text-base font-normal text-white rounded-full hover:bg-darkerblue px-7 py-2 w-full"
                     onClick={toggleFilterDropdown}
                    >
                        <img 
                          src={filterIcon}
                          className="w-4 h-4 text-white transition duration-75"
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            Filter
                        </span>
                        <svg
                         className='w-7 h-7 pl-2 pt-1'
                         fill='currentColor'
                         viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                              fillRule='evenodd'
                              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                        </svg>
                    </button>
                    {toggleFilter && (
                        <ul className="py-2 space-y-2">
                            {filterItems.map((item) => (
                                <li
                                 key={item.id}
                                 className={`flex justify-between w-full hover:bg-darkerblue rounded-full pt-2 pr-7 pb-2 opacity-70 ${
                                    priorityFilter.includes(item.label)
                                    ? 'bg-darkerblue'
                                    : 'bg-transparent'
                                 }`}
                                 onClick={() => 
                                    setPriorityFilter([...priorityFilter, item.label])
                                 }
                                >
                                    <label 
                                    htmlFor={item.id}
                                    className='text-xs font-normal text-white cursor-pointer pl-9'
                                    >
                                        {item.label}
                                    </label>
                                <input
                                     type='checkbox'
                                     name={item.label}
                                     value={item.label}
                                     checked={priorityFilter.includes(item.label)}
                                     className="checkbox focus:ring-0"
                                     key={item.id}
                                     onChange={() => handleFilterSelected(item.label)}
                                />
                          </li>
                        ))}
                    </ul>
                    )}
                    <br/>
                    <a
                     href='#'
                     className="flex items-center self-end text-base font-normal text-white rounded-full hover:bg-darkerblue px-7 py-2"
                    >
                      <img 
                         src={logoutIcon}
                         className="w-4 h-4 text-white transition duration-75"
                      />
                      <span
                        className="flex-1 ml-3 whitespace-nowrap"
                        type='button'
                        onClick={handleLogout}
                       >
                          {loading ? <LoadingSpinner /> : 'Log Out'}
                       </span>
                    </a>
            </div>
        </aside>
    );
};

export default Sidebar;

