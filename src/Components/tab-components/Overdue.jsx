import React, {useEffect, useState} from 'react';
import axios from 'axios';

// import TaskCard from '../TaskCard.jsx';
import EmptyState from '../ui-states/EmptyState.jsx';

const OverdueTab = () => {
//   const [overdueTasks, setOverdueTasks] = useState([]);

//   const fetchTasksData = async () => {
//     await axios.get('http://localhost:3000/tasks/').then((response) => {
//       setOverdueTasks(response.data);
//     });
//   };

//   useEffect(() => {
//     fetchTasksData();
//   }, [])
return (
    <div>
        <EmptyState />
    </div>
)
};