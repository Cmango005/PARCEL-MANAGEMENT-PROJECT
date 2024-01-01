
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { useEffect, useState } from "react";



const AllDeliveryMen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [users])
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
  useEffect(() => {
    fetch('http://localhost:5000/order')
      .then(res => res.json())
      .then(data => setAllOrder(data));
  }, [])
  const countDeliveredOrders = (deliveryMan) => {
    return allOrder.filter(order => order.status === "delivered" || order.status === "paid" && order.deliveryMan === deliveryMan.email).length;
  };
  const countDeliveredRate = (deliveryMan) => {
    const ratings = allOrder.filter((order) => order.status === "paid" && order.deliveryMan === deliveryMan.email);
    const rate = ratings.reduce((sum, item) => sum + (parseInt(item.rate)), 0)
    //console.log(rate);
    const total = Math.ceil(rate / ratings.length);
    return total;


  };
  return (
    <div className="overflow-x-auto mt-8 min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-4">All Delivery Men</h2>

      <table className="min-w-full table table-lg">
        <thead>
          <tr>
            <th className="py-2">Delivery Man Name</th>
            <th className="py-2">Phone Number</th>
            <th className="py-2">Number of Parcels Delivered</th>
            <th className="py-2">Average Rating</th>
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
            <td>
              {
                delivery.map((man ,index)=> <Rating key={index}
                style={{ maxWidth: 120 }}
                value={countDeliveredRate(man)}
                readOnly

              />)
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;