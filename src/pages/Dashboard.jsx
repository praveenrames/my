import React, { useState, useEffect, useReducer } from 'react';
import axios from '../api/axios.js';
import { jwtDecode } from 'jwt-decode';
import { initialState, reducer } from '../reducers/loadingStates.js';
import { useNavigate } from 'react-router-dom';

import TaskInput from '../Components/TaskInput.jsx';
import Header from '../Components/Header.jsx';
import TabNavigation from '../Components/TabNavigation.jsx';
import Sidebar from '../Components/Sidebar.jsx';

import PendingTab from '../Components/tab-components/PendingTab.jsx';
import InProgressTab from '../Components/tab-components/InProgresTab.jsx';
import CompletedTab from '../Components/tab-components/CompletedTab.jsx';
import Task from '../Components/Task.jsx';
import EditProfile from '../Components/EditProfile.jsx';
import ChangePassword from '../Components/ChangePassword.jsx';

const Dashboard = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInprogressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState([]);
    const [sort, setSort] = useState('newest');

    const [taskId, setTaskId] = useState();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDue, setTaskDue] = useState('');
    const [taskDate, setTaskDate] = useState('')

    const [userId, setUserId] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userImage, setUserImage] = useState({ file: [] });
    const [currentPwd, setCurrentPwd] = useState('');
    const [imagePreview, setImagePreview] = useState({ file: [] });

    const [taskOpen, setTaskOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: { AuthoriZation: `Bearer ${token}`},
    };
    const decoded = jwtDecode(token);
    const decodedId = decoded.user;
    const PENDING_TASK_URL = '/tasks/Pending';
    const INPROGRESS_TASK_URL = '/tasks/inprogress';
    const COMPLETED_TASK_URL = '/tasks/completed';
    const USER_URL = `/user/${decodedId}`;

    const fetchPendingData = async () => {
        dispatch({ type: 'SET_LOADING_PENDINGTAB' })
        try{
            const response = await axios.get(PENDING_TASK_URL, config);
            setPendingTasks(response.data);
            dispatch({ type: 'UNSET_LOADING_PENDINGTAB' });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'UNSET_LOADING_PENDINGTAB' });
        }
    };

    const fetchInProgressData = async () => {
        dispatch({ type: 'SET_LOADING_INPROGRESSTAB' });
        try{
            const response = await axios.get(INPROGRESS_TASK_URL, config);
            setInprogressTasks(response.data);
            dispatch({ type: 'UNSET_LOADING_INPROGRESSTAB' })
        } catch (error) {
            console.log(error);
            dispatch({ type: 'UNSET_LOADING_INPROGRESSTAB' })
        }
    };

    const fetchCompletedData = async () => {
        dispatch({ type: 'SET_LOADING_COMPLETEDTAB' });
        try{
            const response = await axios.get(COMPLETED_TASK_URL, config);
            setCompletedTasks(response.data);
            dispatch({ type: 'UNSET_LOADING_COMPLETEDTAB'});
        } catch (error) {
            console.log(error);
            dispatch({ type: 'UNSET_LOADING_COMPLETEDTAB' });
        }
    };

    const fetchTasksData = async (id) => {
        dispatch({ type: 'SET_LOADING_TASKMODAL' });
        try{
           const { data } = await axios.get(`/task/${id}`, config);
           const {_id, title, description, priority, status, dueDate, createdAt} = 
              data;
              setTaskId(_id);
              setTaskTitle(title);
              setTaskDescription(description);
              setTaskPriority(priority);
              setTaskStatus(status);
              setTaskDue(dueDate);
              setTaskDate(createdAt);
              dispatch({ type: 'UNSET_LOADING_TASKMODAL' });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'UNSET_LOADING_TASKMODAL' });
        }
    };

    const handleUpdate = (response) => {
        const updatedTask = response.data.task;
        setTaskTitle(updatedTask.title);
        setTaskDescription(updatedTask.description);
        setTaskPriority(updatedTask.priority);
        setTaskStatus(updatedTask.status);
        setTaskDue(updatedTask.dueDate);
    };

    const addPending = (newTask) => {
        setPendingTasks((prevState) => [...prevState, newTask]);
    };

    const addInProgress = (newTask) => {
        setInprogressTasks((prevState) => [...prevState, newTask]);
    };
    
    const addCompleted = (newTask) => {
        setCompletedTasks((prevState) => [...prevState, newTask]);
    }

    const updatePending = (updatedTasks) => {
        setPendingTasks((prevState) => 
            prevState.map((task) => 
                task._id === updatedTasks._id ? updatedTasks : task
            )
        );
    };

    const updateInProgress = (updatedTasks) => {
        setInprogressTasks((prevState) =>
            prevState.map((task) => 
                task._id === updatedTasks._id ? updatedTasks : task
            ) 
        );
    };

    const updateCompleted = (updatedTasks) => {
        setCompletedTasks((prevState) =>
            prevState.map((task) =>
                task._id === updatedTasks._id ? updatedTasks : task
         )
       );
    };

    const getUser = async () => {
        await axios.get(USER_URL, config).then((response) => {
            const { id, firstName, lastName, email, userImage, password } = 
               response?.data;
               setUserId(id);
               setFirstName(firstName);
               setLastName(lastName);
               setEmail(email);
               setUserImage(userImage);
               setImagePreview(userImage);
        });
    };

    const handleTaskOpen = (id) => {
        fetchTasksData(id);
        setTaskOpen(true);
        navigate(`/${id}`);
    }

    const handleProfileModalClose = () => {
        setProfileModalOpen(false);
        navigate('/dashboard');
    };

    const sortOldest = () => {
        setSort('oldest')
    }

    const sortDueDate = () => {
        setSort('duedate');
    };

    useEffect(() => {
        fetchPendingData();
        fetchInProgressData();
        fetchCompletedData();
    }, []);

    useEffect(() => {
        getUser();
    }, [firstName, lastName, email, userImage, currentPwd]);

    const tabdata = [
        {
           id: '1',
           key: '1',
           tabTitle: 'PENDING',
           tabContent: (
              <PendingTab
                 pendingTasks={pendingTasks}
                 setPendingTasks={setPendingTasks}
                 setInProgressTasks={setInprogressTasks}
                 priorityFilter={priorityFilter}
                 sort={sort}
                 taskOpen={taskOpen}
                 setIsEditing={setIsEditing}
                 loading={state.loadingPendingTab}
                 handleTaskOpen={handleTaskOpen}
              />
           ),
        },

        {
            id: '2',
            key: '2',
            tabTitle: 'IN PROGRESS',
            tabContent: (
                <InProgressTab
                    inProgressTasks={inProgressTasks}
                    setPendingTasks={setPendingTasks}
                    setInProgressTasks={setInprogressTasks}
                    priorityFilter={priorityFilter}
                    sort={sort}
                    taskOpen={taskOpen}
                    handleTaskOpen={handleTaskOpen}
                    setIsEditing={setIsEditing}
                    loading={state.loadingInprogressTab}
                />
            ),
        },

        {
            id: '3',
            key: '3',
            tabTitle: 'COMPLETED',
            tabContent: (
                <CompletedTab
                    completedTasks={completedTasks}
                    priorityFilter={priorityFilter}
                    sort={sort}
                    taskOpen={taskOpen}
                    setIsEditing={setIsEditing}
                    loading={state.loadingCompletdTab}
                    setCompletedTasks={setCompletedTasks}
                    handleTaskOpen={handleTaskOpen}
                />
            ),
        },
    ];

    const [activeStatusTab, setActiveStatusTab] = useState(tabdata[0].id)

    return (
        <>
        <div className='flex flex-row'>
            <Sidebar
             activeStatusTab={activeStatusTab}
             pendingTasks={pendingTasks}
             inProgressTasks={inProgressTasks}
             completedTasks={completedTasks}
             priorityFilter={priorityFilter}
             setPriorityFilter={setPriorityFilter}
             sort={sort}
             setSort={setSort}
             sortOldest={sortOldest}
             sortDueDate={sortDueDate}
             setProfileModalOpen={setProfileModalOpen}
             firstName={firstName}
             lastName={lastName}
             email={email}
             userImage={userImage}
             setUserImage={setUserImage}
             decodedId={decodedId}
            />
            <div className='flex flex-col w-full'>
                <Header firstName={firstName} handleTaskOpen={handleTaskOpen} />
                <TabNavigation
                  tabdata={tabdata}
                  activeStatusTab={activeStatusTab}
                  setActiveStatusTab={setActiveStatusTab}
                />
                <TaskInput
                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}
                  taskDescription={taskDescription}
                  setTaskDescription={setTaskDescription}
                  taskStatus={taskStatus}
                  setTaskStatus={setTaskStatus}
                  taskPriority={taskPriority}
                  setTaskPriority={setTaskPriority}
                  taskDue={taskDue}
                  setTaskDue={setTaskDue}
                  addPending={addPending}
                  addInProgress={addInProgress}
                  addCompleted={addCompleted}
                />

                <Task
                  taskId={taskId}
                  taskOpen={taskOpen}
                  setTaskOpen={setTaskOpen}
                  taskTitle={taskTitle}
                  taskDescription={taskDescription}
                  taskStatus={taskStatus}
                  taskPriority={taskPriority}
                  taskDue={taskDue}
                  taskDate={taskDate}
                  onUpdate={handleUpdate}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  loading={state.loadingTaskModal}
                  updatePending={updatePending}
                  updateInProgress={updateInProgress}
                  updateCompleted={updateCompleted}
                  setPendingTasks={setPendingTasks}
                  setInProgressTasks={setInprogressTasks}
                  setCompletedTasks={setCompletedTasks}
                />
                
                <EditProfile
                  handleProfileModalClose={handleProfileModalClose}
                  profileModalOpen={profileModalOpen}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  userId={userId}
                  setUserImage={setUserImage}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  setPasswordModalOpen={setPasswordModalOpen}
                />
                <div>
                  <ChangePassword
                   userId={userId}
                   passwordModalOpen={passwordModalOpen}
                   setPasswordModalOpen={setPasswordModalOpen}
                   setProfileModalOpen={setProfileModalOpen}
                  />
                </div>
                 
            </div>
        </div>
        </>
    );
};

export default Dashboard;