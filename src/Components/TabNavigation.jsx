import React from 'react';

const TabNavigation = ({ tabdata, activeStatusTab, setActiveStatusTab }) => {
  const statusTabTitles = tabdata.map((tab, id) => (
    <li
      key={id}
      onClick={() => setActiveStatusTab(tab.id)}
      className={
        activeStatusTab === tab.id
          ? 'px-8 inline-block p-4 rounded-t-lg border-b-2 text-brightblue font-bold border-brightblue hover:text-brightblue hover:border-brighterblue cursor-pointer '
          : 'px-8 inline-block p-4 text-grey rounded-t-lg border-b border-gray-300 cursor-pointer'
      }
    >
      {tab.tabTitle}
    </li>
  ));

  const tabContents = tabdata.map((content, id) => (
    <div
      className='w-full'
      key={id}
      style={activeStatusTab === content.id ? {} : { display: 'none' }}
    >
      {content.tabContent}
    </div>
  ));

  return (
    <div className='pl-72 pt-28'>
      <div className='text-normal font-medium text-center text-gray-500 border-b fixed bg-white z-10 drop-shadow w-full'>
        <ul className='flex flex-row -mb-px px-8 mt-4'>{statusTabTitles}</ul>
      </div>
      <div className='px-8 pt-28 pb-8 '>
        <div
          id='tab-contents'
          className='w-full columns-3 gap-8 break-inside-avoid'
        >
          {tabContents}
        </div>
      </div>
      <div className='fixed bg-lightergray w-full h-full -z-10 inset-0'></div>
    </div>
  );
};

export default TabNavigation;