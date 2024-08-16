import axios from "axios";

export default axios.create({
    baseURL: 'https://task-management-app-back-end-side.onrender.com'
},
{
   Credentials: 'include',
});
