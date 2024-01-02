import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AllParcel = () => {
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/order')
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => {
                    const statusOrder = ["pending", "on the way", "delivered", "paid"];
                    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
                });
                setAllOrder(sortedData)
            })
    }, [allOrder])
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])

    const deliveryMan = users.filter(user => user?.role === "Delivery-Man")
    const [selectedParcel, setSelectedParcel] = useState('');
    const [selectedDeliveryman, setSelectedDeliveryman] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isAssigned, setIsAssigned] = useState(false);
    const resetState = () => {
        setSelectedParcel('');
        setSelectedDeliveryman('');
        setDeliveryDate('');
        setIsAssigned(false);
    };
    const handleManageParcel = (parcel) => {
        //console.log(parcel)
        resetState();
        setSelectedParcel(parcel);

    };

    const handleAssignDelivery = async (id) => {

        setIsAssigned(true);
        fetch(`https://parcel-management-server-steel.vercel.app/order/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'on the way', deliveryMan: selectedDeliveryman, deliveryDate })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    const remaining = allOrder.filter(order => order._id !== id);
                    const updated = allOrder.find(order => order._id === id);
                    updated.status = 'on the way';
                    updated.deliveryMan = selectedDeliveryman;
                    updated.deliveryDate = deliveryDate;
                    const newOrder = [updated, ...remaining];
                    setAllOrder(newOrder);
                    toast(`${selectedDeliveryman} assigned for delivery`);
                }
            });


    };
    return (
        <div className="overflow-x-auto mt-8 p-2 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">All Parcels</h2>

            <table className="table table-2xl ">
                <thead>
                    <tr>
                        <th className="py-2">Users Name</th>
                        <th className="py-2">Users Phone</th>
                        <th className="py-2">Booking Date</th>
                        <th className="py-2">Requested Delivery Date</th>
                        <th className="py-2">Cost</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrder.map((parcel, index) => (

                        <tr key={index} className="text-white ">

                            <td className="py-2 ">{parcel.userName}</td>
                            <td className="py-2">{parcel.phoneNumber}</td>
                            <td className="py-2">{parcel.orderDate}</td>
                            <td className="py-2">{parcel.requestedDeliveryDate}</td>
                            <td className="py-2">{parcel.price}</td>
                            <td className="py-2">{parcel.status}</td>
                            <td className="py-2">
                                {
                                    parcel.status === 'delivered' || parcel.status === 'on the way' || parcel.status === "paid" ? <><button disabled className="">Already Managed</button></> :
                                        <>
                                            <label htmlFor="my_modal_7" onClick={() => handleManageParcel(parcel)} className="bg-blue-500 btn text-white px-4 py-2 rounded">Manage</label>
                                            {/* Put this part before </body> tag */}
                                            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                            <div className="modal" role="dialog">
                                                <div className="modal-box">
                                                    <h2 className="text-2xl font-bold mb-4">Manage Parcel</h2>

                                                    {/* Select Deliveryman */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Select Deliveryman
                                                        </label>
                                                        <select
                                                            onChange={(e) => setSelectedDeliveryman(e.target.value)}

                                                            value={selectedDeliveryman}
                                                            className="mt-1 p-2 border rounded w-full"
                                                        >
                                                            <option disabled value="">Select Deliveryman</option>
                                                            {deliveryMan.map((man) => (
                                                                <option key={man._id} value={man.email}>
                                                                    {man._id}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Select Approximate Delivery Date */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Approximate Delivery Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            onChange={(e) => setDeliveryDate(e.target.value)}
                                                            value={deliveryDate}
                                                            className="mt-1 p-2 border rounded w-full"
                                                        />
                                                    </div>

                                                    {/* Assign Button */}
                                                    {deliveryMan && deliveryDate ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleAssignDelivery(selectedParcel._id)}
                                                                className={`bg-blue-500 text-white px-4 py-2 rounded ${isAssigned ? 'cursor-not-allowed opacity-50' : ''}`}
                                                                disabled={isAssigned}
                                                            >
                                                                Assign
                                                            </button>
                                                            <ToastContainer></ToastContainer>
                                                        </>
                                                    ) : (
                                                        <>Please Select Date & Delivery Man</>
                                                    )}
                                                </div>
                                                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                            </div>
                                        </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default AllParcel;