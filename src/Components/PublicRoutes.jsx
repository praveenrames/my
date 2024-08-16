import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const getUser = localStorage.getItem('token');

    if(getUser) {
        return true;
    } else {
        return false;
    }
};

const ProtectedRoutes = () => {
    const auth = useAuth();

    return auth ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default ProtectedRoutes;