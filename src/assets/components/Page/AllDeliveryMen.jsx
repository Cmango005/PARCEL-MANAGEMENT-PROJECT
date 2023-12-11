
import { useEffect, useState } from "react";
   

const AllDeliveryMen = () => {
    const [users, setUsers]=useState([]);
    useEffect(()=>{
      fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
     },[users])
    const deliveryMan = users.filter(user => user.role === "Delivery-Man")
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
            {deliveryMan.map((man, index) => (
              <tr key={index}>
                <td className="py-2">{man.name}</td>
                <td className="py-2">{man.phoneNumber}</td>
                <td className="py-2">{man.parcelsDelivered}</td>
                <td className="py-2">{man.averageReview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AllDeliveryMen;