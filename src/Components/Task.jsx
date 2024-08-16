import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
import editIcon from '../assets/icon/edit-icon.svg';
import deleteIcon from '../assets/icon/delete-icon.svg';
import LoadingSpinner from '../Components/ui-states/loadingSpinner.jsx';
import LoadingSpinnerBlue from '../Components/ui-states/loadingSpinnerBlue.jsx';

const Task = ({
    taskId,
    taskTitle,
    taskDescription,
    taskStatus,
    taskPriority,
    taskDue,
    taskDate,
    taskOpen,
    setTaskOpen,
    onUpdate,
    isEditing,
    setIsEditing,
    loading,
    updatePending,
    updateInProgress,
    updateCompleted,
    setPendingTasks,
    setInProgressTasks,
    setCompletedTasks,
}) => {
    const currentTask = {
        _id : taskId,
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
        priority: taskPriority,
        dueDate: taskDue,
        createdAt: taskDate,
    };

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };

    const [editedTask, setEditedTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleModalClose = () => {
        setTaskOpen(false);
        navigate('/dashboard');
        setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTask(currentTask);
    }

    const handleDelete = async (taskId, taskStatus) => {
        let status;
        taskStatus === 'Pending'
        ? (status = 1)
        : taskStatus === 'In Progress'
        ? (status = 2)
        : (status = 3);
        console.log(status);
        try {
            await axios.delete(`${taskId}`, config);
            status === 1
            ? setPendingTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            )
            : status === 2
            ? setInProgressTasks((prevTasks) => 
                prevTasks.filter((task) => task._id !== taskId)
            )
            : setCompletedTasks((prevTasks) => 
                prevTasks.filter((task) => task._id !== taskId)
            );
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (name, value) => {
        setEditedTask((oldTask) => ({...oldTask, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await axios
        .put(`/edit/${editedTask._id}`, editedTask, config)
        .then((response) => {
            onUpdate(response);
        {
            response.data.task.status === 'Pending'
            ? updatePending(response.data.task)
            : response.data.task.status === 'In Progress'
            ? updateInProgress(response.data.task)
            : updateCompleted(response.data.task);
          }
        })
        .then(setIsLoading(false));

        setIsEditing(false);
    };

    let due = new Date(taskDue);
    let createdAt = new Date(taskDate);
    let dueDate = due.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    let createdDate = createdAt.toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
  });

  return (
    <div>
        {taskOpen ? (
            <section>
                <div
                 id='task-input'
                 tabIndex='-1'
                 className='overflow-y-auto overflow-x-hidden fixed z-50 pt-14 w-full md:inset-0 h-modal md:h-full'
                >
                    <div className='relative p-4 w-1/2 h-full md:h-auto inset-x-1/3 inset-y-16'>
                      {/* <Modal content> */}
                      <div className='relative bg-white rounded-lg shadow'>
                        <button
                         type='button'
                         className='absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                         onClick={handleModalClose}
                        >
                        <svg
                         className='w-5 h-5'
                         fill='currentColor'
                         viewBox='0 0 20 20'
                         xmlns='http://www.w3.org/2000/svg'
                        >
                            <path 
                             fillRule='evenodd'
                             d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                             clipRule='evenodd'
                            ></path>
                        </svg>
                        </button>
                        {isEditing ? (
                            <div className='py-6 px-6 lg:px-8'>
                             <form onSubmit={handleSubmit} className='space-y-6'>
                                <input
                                 type='text'
                                 placeholder='Enter your task title...'
                                 className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6'
                                 id='title'
                                 name='title'
                                 value={editedTask.title}
                                 onChange={(e) => 
                                    handleInputChange(e.target.name, e.target.value)
                                 }
                                 required
                                />
                                <div 
                                 id='selection'
                                 className='flex flex-row items-center'
                                >
                                    <select
                                      name='status'
                                      className='w-32 h-8 border-none bg-darkblue text-white text-xs rounded-md mr-4'
                                      value={editedTask.status}
                                      onChange={(e) => 
                                        handleInputChange(e.target.name, e.target.value)
                                      }
                                      required
                                    >
                                        <option value='' disabled>
                                            Status
                                        </option>
                                        <option vlaue='Pending'>Pending</option>
                                        <option value='In Progress'>In Progress</option>
                                        <option value='Completed'>Completed</option>
                                    </select>
                                    <select
                                     name='priority'
                                     className='w-32 h-8 border-none bg-darkblue text-white text-xs rounded-md mr-4'
                                     value={editedTask.priority}
                                     onChange={(e) => 
                                        handleInputChange(e.target.name, e.target.value)
                                     }
                                     required
                                    >
                                        <option value='' disabled>
                                            Priority
                                        </option>
                                        <option value='Low Priority'>Low Priority</option>
                                        <option value='Medium Priority'>Medium Priority</option>
                                        <option value='High Priority'>High Priority</option>
                                        <option value='Urgent'>Urgent</option>
                                    </select>
                                    <div
                                     id='due-date'
                                     className='flex-row items-center ml-auto inline-flex'
                                    >
                                        <p className='text-sm font-bold mr-4'>DUE DATE: </p>
                                        <input
                                         type='date'
                                         name='dueDate'
                                         className='bg-lightgray border-none text-xs rounded-md'
                                         value={editedTask.dueDate}
                                         onChange={(e) => 
                                            handleInputChange(e.target.name, e.target.value)
                                         }
                                        />
                                    </div>
                                </div>

                                <textarea
                                 placeholder='Write your task description...'
                                 cols='30'
                                 rows='10'
                                 className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-blue-500 focus:border-brightblue block w-full p-2.5'
                                 id='description'
                                 name='description'
                                 value={editedTask.description || ''}
                                 onChange={(e) => 
                                    handleInputChange(e.target.name, e.target.value)
                                 }
                                ></textarea>
                                    <div className='w-full flex justify-end'>
                                        <div className='flex flex-row w-2/3 space-x-4'>
                                           <button
                                             type='submit'
                                             className='w-full text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90'
                                             onClick={handleModalClose}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                              type='submit'
                                              className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center'
                                            >
                                                <div>
                                                    {isLoading ? <LoadingSpinner /> : 'Save Task'}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                             </form>
                          </div>
                        ) : loading ? (
                            <div className='w-full'>
                                <LoadingSpinnerBlue />
                            </div>
                        ) : (
                            <div className='py-6 px-6 lg:px-8'>
                                <h1 className='text-3xl font-bold tracking-tight text-darkblue pb-6 pt-6'>
                                    {taskTitle}
                                </h1>
                            <div className='flex flex-row gap-4 pb-2'>
                              <p 
                               className={(() => {
                                switch (taskPriority) {
                                    case 'Low Priority':
                                        return 'border border-grey text-xs text-grey rounded-full px-2 py-2 w-28 text-center';
                                    case 'Medium Priority':
                                        return 'bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-28 text-center';
                                    case 'High Priority':
                                        return 'bg-darkblue text-xs text-white rounded-full px-2 py-2 w-28 text-center';
                                    case 'Urgent':
                                        return 'bg-brightblue text-xs text-white rounded-full px-2 py-2 w-28 text-center';
                                    default:
                                        return null;
                                }
                               })()}
                           >
                            {' '}
                            {taskPriority}
                           </p>
                           <p 
                            className={(() => {
                                switch (taskStatus) {
                                    case 'Pending':
                                      return 'border border-grey text-xs text-grey rounded-full px-1 py-2 w-24 text-center';
                                    case 'In Progress':
                                      return 'bg-lightgray text-xs text-grey rounded-full px-2 py-2 w-36 text-center';
                                    case 'Completed':
                                      return 'bg-darkblue text-xs text-white rounded-full px-2 py-2 w-28 text-center';
                                    case 'overdue':
                                      return 'bg-brightblue text-xs text-white rounded-full px-2 py-2 w-36 text-center';
                                    default:
                                      return null;
                                }
                            })()}
                        >
                            {' '}
                            {taskStatus}
                        </p>
                        </div>
                        <p className='text-grey text-xs pt-4 pb-1 font-normal'>
                            Date Added: {createdDate}
                        </p>
                        <p className='text-xs font-bold text-darkblue'>
                            Due Date: {' '}
                            {dueDate == 'Invalid Date' ? 'Unknown' : dueDate}{' '}
                        </p>
                        <p className='text-sm font-normal text-grey pr-2 py-2 py-10 whitespace-pre-line leading-6'>
                            {taskDescription}
                        </p>

                        <button
                          type='button'
                          className='absolute bottom-3 right-3.5 bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mr-6'
                          onClick={handleEdit}
                        >
                            {' '}
                            <img src={editIcon} className='w-4 h-4'/>
                        </button>
                        <button
                          type='button'
                          className='absolute bottom-3 right-3.5 bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                          onClick={() => handleDelete(taskId, taskStatus)}
                        >
                            <img src={deleteIcon} className='w-4 h-4'/>{' '}
                        </button>
                        </div>
                        )}
                      </div>
                    </div>
                </div>
                 <div className='fixed inset-0 w-full bg-black z-30 opacity-40'></div>
            </section>
           ) : (
           ''
        )}
    </div>
  )
}

export default Task