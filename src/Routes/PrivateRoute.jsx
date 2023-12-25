import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";



// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log(location);

    if(loading){
        return <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;