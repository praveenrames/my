import axios from "axios";

export default axios.create({
    baseURL: 'https://task-management-app-back-end-side-1.onrender.com'
},
{
   Credentials: 'include',
});
