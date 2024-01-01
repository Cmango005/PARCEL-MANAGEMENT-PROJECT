import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const useDeliveryMan = () => {
  const { user } = useContext(AuthContext);

  const { data: isDeliveryMen } = useQuery({
    queryKey: [user?.email, 'isDeliveryMen'],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/delivery-man/${user?.email}`);
        if (!res.ok) {
          throw new Error(`Error fetching data from http://localhost:5000/users/delivery-man/${user?.email}`);
        }

        const data = await res.json();
        return data.deliveryMan; 
      } catch (error) {
        console.error("Error fetching delivery man:", error);
        throw error;
      }
    }
  })
  return [isDeliveryMen]
};

export default useDeliveryMan;