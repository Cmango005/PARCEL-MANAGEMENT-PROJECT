import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const [isAdmin,isAdminLoading] = useAdmin();
    const location = useLocation()
    if( isAdminLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user && isAdmin){
       return children
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default AdminRoute;