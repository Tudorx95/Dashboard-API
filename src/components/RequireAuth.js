import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//componenta necesara pentru a redirectiona toate rutele catre respectiva cale data 
const RequireAuth = ({ allowedRoles }) => {     // roles array passed in to the component
    const { auth } = useAuth();                 // extract the auth credentials
    const location = useLocation();            
     console.log(allowedRoles);
    return (
        // roles here is an array from the auth state 
        // compare those two arrays in order to login
        auth?.user//?.find(role => allowedRoles[0].Nume?.includes(role))         // if the user is within this Roles 
            ? <Outlet />
            : auth?.user    // if we have a user it must be authorized
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;