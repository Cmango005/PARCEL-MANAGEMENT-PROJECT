import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyReview = () => {
    const { user } = useContext(AuthContext);

    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
    const myDelivery = allOrder.filter(my => my.deliveryMan === user?.email && my?.review !== "Not Yet");

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])
   
    return (

            <div className="p-5">
            <p className="text-center font-bold text-xl">My Reviews</p>
            <hr />
            <div className="grid grid-cols-3 gap-5 p-10">
                {
                    myDelivery.map(my => <div key={my._id}>
                        <img src={my.photo} alt="" className="h-20 w-24 rounded-sm flex justify-center" />
                        <p>Customer Name: {my.userName}</p>

                        <p>Review:{my.review}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyReview;