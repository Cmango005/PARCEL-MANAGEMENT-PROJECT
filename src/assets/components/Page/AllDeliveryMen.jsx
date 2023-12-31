
import { useEffect, useState } from "react";
   

const AllDeliveryMen = () => {
    const [users, setUsers]=useState([]);
    useEffect(()=>{
      fetch('https://parcel-management-server-steel.vercel.app/users')
      .then(res => res.json())
      .then(data => setUsers(data))
     },[users])
    const delivery = users.filter(user => user.role === "Delivery-Man")
    const name = () => {
      return delivery.map((man, index) => (
        <div key={man._id} className="space-x-10">
          <td className="py-2">{index + 1}.{man.name}</td>
        </div>
      ));
    };
  
    const phone = () => {
      return delivery.map((man) => (
        <div key={man._id} className="space-x-10">
          <td className="py-2">{man.phone}</td>
        </div>
      ));
    };
    const [allOrder, setAllOrder] = useState([]);
    useEffect(()=>{
      fetch('https://parcel-management-server-steel.vercel.app/order')
      .then(res => res.json())
      .then(data => setAllOrder(data));
    },[])
    const countDeliveredOrders = (deliveryMan) => {
      return allOrder.filter(order => order.status === "delivered" || order.status === "paid" && order.deliveryMan === deliveryMan.email).length;
    };

    return (
        <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">All Delivery Men</h2>
  
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2">Delivery Man Name</th>
              <th className="py-2">Phone Number</th>
              <th className="py-2">Number of Parcels Delivered</th>
              <th className="py-2">Average Review</th>
            </tr>
          </thead>
          <tbody>
          <tr className="text-center">
            <td className="py-2">{name()}</td>
            <td className="py-2">{phone()}</td>
            <td className="py-2">
              {delivery.map((man) => (
                <div key={man._id} className="space-x-10">
                  {countDeliveredOrders(man)}
                </div>
              ))}
            </td>
            
          </tr>
          </tbody>
        </table>
      </div>
    );
};

export default AllDeliveryMen;