import axios from "../../api/axios.js";
import { useState } from "react";

const TaskCard = ({
    id,
    title,
    description,
    priority,
    status,
    dueDate,
    createdAt,
    setPendingTasks,
    setInProgressTasks,
    handleTaskOpen,
}) => {
    const [dropdown, setDropdown] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: { Authorization: `Bearer ${token}`},
    };

    const toggleTask = () => {
        dropdown === 'hidden' ? setDropdown('visible') : setDropdown('hidden');
    };

    const handleDelete = async () => {
        let taskStatus;
        status === 'pending' ? (taskStatus = 1) : (taskStatus = 2);
        try {
            await axios.delete(`${id}`, config);
            taskStatus === 1
            ? setPendingTasks((prevTasks) => 
                prevTasks.filter((task) => task._id !== id)
            )
            : setInProgressTasks((prevTasks) => 
                prevTasks.filter((task) => task._id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6 max-w-sm pl-8 bg-white rounded-lg border border-lightergray shadow-md hover:grey h-fit mb-8 break-inside-avoid cursor-pointer">
            <div className="flex justify-end pt-7">
                <button
                  id='dropdownButton'
                  type='button'
                  className="sm:inline-block text-gray-500 rounded-lg text-sm"
                  onClick={toggleTask}
                >
                    <svg
                      className='w-4 h-4 relative left-24 -top-8 hover:bg-gray-100 focus:outline-none border-1 rounded-full'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />'
                    </svg>
                </button>
                {/* <!--Dropdown menu--> */}
              <div
                id='dropdown'
                style={{visibility: `${dropdown}`}}
                className="relative -left-5 -top-8 z-10 w-24 text-base list-none bg-lightergray rounded divide-y divide-gray-100 shadow"
               >
                <ul aria-labelledby="dropdownButton">
                    <li>
                        <button
                          onClick={handleDelete}
                          className='block py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100'
                        >
                            Delete
                     </button>
                   </li>
                 </ul>
               </div>
            </div>
            <div className="flex flex-col -mt-14" onClick={() => handleTaskOpen(id)}>
                <h1 className='text-2xl font-bold tracking-tight text-darkblue pb-4 w-72'>
                    {title}
                </h1>
                <p 
                className={(() => {
                    switch (priority) {
                        case 'Low Priority':
                            return 'border border-grey text-xs text-grey rounded-full py-1 w-24 text-center';
                        case 'Medium Priority':
                            return 'bg-lightgray text-xs text-grey rounded-full py-1 w-32 text-center';
                        case 'High Priority':
                            return 'bg-darkblue text-xs text-white rounded-full py-1 w-16 text-center';
                        case 'Urgent':
                            return 'bg-brightblue text-xs text-white rounded-full py-1 w-16 text-center';
                        default:
                            return null;
                    }
                  })()}
                >
                  {' '}
                  {priority}
               </p>
            <p className="text-xs text-darkblue font-semibold pt-4">
                 Due Date: {dueDate == 'Invalid Date' ? 'Unknown' : dueDate}
            </p>
            <p className='text-xs font-normal text-grey pr-2 pt-3 whitespace-pre-line leading-5'>
                 {!description ? '' :description.substring(0, 250)}...
            </p>
            <p className="pt-5 pb-1 text-xs font text-grey opacity-40">
                 Date Added: {createdAt}
            </p>
        </div>
    </div>
    );
};

export default TaskCard;