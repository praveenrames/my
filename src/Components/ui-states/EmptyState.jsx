import React from 'react'
import taskIcon from '../../assets/icon/task-icon.svg';


const EmptyState = () => {
  return (
      <section className='fixed w-4/5'>
        <div className='flex flex-col place-items-center py-40'>
            <img src={taskIcon} className='w-20 h-auto' />
        <p className='text-xs font-bold text-grey opacity-70'>No tasks found.</p>
        </div>
      </section>
  )
}

export default EmptyState