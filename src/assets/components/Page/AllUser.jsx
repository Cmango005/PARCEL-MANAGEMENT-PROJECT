
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";


const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])
    const deliveryMan = users.filter(delivery => delivery.role === 'Delivery-Man')
    const handleMakeAdmin = user => {
        fetch(`https://parcel-management-server-steel.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    toast(`${user.name} is Admin now`)
                }
            })
    }
    const handleMakeDeliveryMan = user => {

        fetch(`https://parcel-management-server-steel.vercel.app/users/delivery-man/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    toast(`${user.name} is Delivery Man now`)
                }
            })
    }
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])

    const myBook = (my) => {
        return allOrder.filter(me => me.email === my.email).length
    }
    const totalMoney = (my) =>{
        const spent = allOrder.filter(me => me.email === my?.email)
        const money = spent.reduce((sum, order) => sum + (order.price || 0), 0);
        return money;
       //console.log(money)
    }

    return (
        <div className="">
            <div className="flex space-x-10">
                <p>User:{users.length}</p>
                <p>Total Delivery-Man: {deliveryMan.length}</p>
            </div>
            <div className="overflow-x-auto p-5">
                <table className="table w-3/4">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number of parcel Booked</th>
                            <th>Total Spent Amount</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((user, index) => <tr key={user._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{myBook(user)}</td>
                                <td>{totalMoney(user)}</td>
                                <td><div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn m-1">Role</div>
                                    <ul className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                                        {user.role === 'Admin' ? (
                                            <p>Admin</p>
                                        ) : user.role === 'Delivery-Man' ? (
                                            <p>Delivery-Man</p>
                                        ) : (
                                            <>
                                                <button onClick={() => handleMakeAdmin(user)}>
                                                    <li><a>Make Admin</a></li>
                                                </button>
                                                <button onClick={() => handleMakeDeliveryMan(user)}>
                                                    <li><a>Make Delivery Man</a></li>
                                                </button>

                                            </>
                                        )}

                                        <ToastContainer></ToastContainer>

                                    </ul>
                                </div></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;