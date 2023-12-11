import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
        if (!response.ok) {
          throw new Error(`Error fetching data from http://localhost:5000/users/admin/${user?.email}`);
        }

        const data = await response.json();
        return data?.admin;
      } catch (error) {
        console.error('Error fetching admin status:', error);
        throw error;
      }
    }
  })
  return [isAdmin, isAdminLoading]
};

export default useAdmin;