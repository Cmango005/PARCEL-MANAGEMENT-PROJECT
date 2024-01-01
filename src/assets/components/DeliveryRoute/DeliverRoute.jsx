import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useDeliveryMan from "../Hooks/useDeliveryMan";
import { Navigate, useLocation } from "react-router-dom";


const DeliverRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const [isDelivery,isDeliveryLoading] = useDeliveryMan();
    const location = useLocation()
    if( isDeliveryLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user && isDelivery){
       return children
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default DeliverRoute;