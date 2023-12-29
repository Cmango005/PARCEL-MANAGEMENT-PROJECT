import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaStar, FaMoneyBill } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

import { MdOutlineBookmark } from "react-icons/md";


const MyItems = () => {
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-200";
            case "on the way":
                return "bg-blue-200";
            case "delivered":
                return "bg-green-200";
            case "paid":
                return "bg-red-200"
            default:
                return "";
        }
    };
    const { user } = useContext(AuthContext);

    const [myOrder, setMyOrder] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/order?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyOrder(data))
    }, [user?.email])

    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
 
    const [selectedParcel, setSelectedParcel] = useState('');
    const [review, setReview] = useState('');
    const handleParcelReview = (parcel) => {
        
        setSelectedParcel(parcel);
    };
    const [isReviewDone, setIsReviewDone] = useState(false);
    const handleReviewSubmit = async (id, review, deliveryMan, deliveryDate, photo) => {
        setIsReviewDone(true);
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "paid", review, deliveryMan, deliveryDate, photo })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = allOrder.filter(order => order._id !== id);
                    const updated = allOrder.find(order => order._id === id);
                    updated.status = 'paid';
                    updated.deliveryMan = deliveryMan;
                    updated.deliveryDate = deliveryDate;
                    updated.review = review;
                    updated.photo = photo
                    const newOrder = [updated, ...remaining];
                    setAllOrder(newOrder);
                    toast('Thanks for your valuable review');
                }
            });
    };


    //const [isPaid, setIsPaid] = useState("");
  
    // const handlePaySubmit = async(id)=>{
    //     fetch(`http://localhost:5000/order/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ status: "paid" })
    //     })
    // }
    const handleCancel = (id) => {
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast('Cancel Order SuccessFully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                    const remaining = myOrder.filter(order => order._id !== id);
                    setMyOrder(remaining);
                }
            })
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Items Type</th>
                        <th>Requested Delivery Date</th>
                        <th>Approximate Delivery Date</th>
                        <th>Booking Date</th>
                        <th>Delivery Men Email</th>
                        <th>Booking Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        myOrder.map(parcel => <tr key={parcel._id} className={getStatusColor(parcel.status)}>
                            <td className="text-black">{parcel.type}</td>
                            <td className="text-black">{parcel.requestedDeliveryDate}</td>
                            <td className="text-black">{parcel.deliveryDate}</td>
                            <td className="text-black">{parcel.orderDate}</td>
                            <td className="text-black">{parcel.deliveryMan}</td>
                            <td className="text-black">{parcel.status}</td>
                            <td className="space-y-1">

                                {
                                    parcel.status === "pending" ? <> <Link to={`/dashboard/update/${parcel._id}`}>
                                        <button className="btn btn-sm btn-warning">
                                            Update<FaEdit className="" />
                                        </button>
                                    </Link>
                                        <button onClick={() => handleCancel(parcel._id)} className="btn btn-sm btn-danger ">
                                            Cancel<FaTrash className='' />
                                        </button>
                                        <ToastContainer></ToastContainer>
                                    </> : <></>
                                }
                                {
                                    parcel.status === "on the way" ? <><img className="h-14 w-14 p-1" src="https://i.ibb.co/F30KhLp/moving-car.gif" alt="" /></> :
                                        <></>
                                }
                                {
                                    parcel.status === "delivered" ? <> <div>
                                        <Link to={`/dashboard/payment/${parcel._id}`}><button className="btn btn-sm btn-neutral">Pay<FaMoneyBill className="ml-2" /></button></Link>
                                       
                                    </div>
                                    </> : <></>
                                }
                                {
                                    parcel.review ? <><button disabled className="px-3 py-2 rounded border-2 border-gray-950" >Thanks For Your Review </button></> : <>{
                                        parcel.status === "paid" ? <><div>
                                            <label htmlFor="my_modal_7" onClick={() => handleParcelReview(parcel)} className="btn btn-sm btn-neutral">Review<FaStar className="" /></label>
                                            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                            <div className="modal" role="dialog">
                                                    <div className="modal-box">
                                                        <h2 className="text-2xl font-bold mb-4">Give Review</h2>
                                                        <label className="label">
                                                            <span className="label-text">{user?.displayName} Photo</span>
                                                        </label>
                                                        <img
                                                            readOnly
                                                            src={user?.photoURL}
                                                            className="w-32 h-32 rounded-full mb-4"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            readOnly
                                                            value={user?.photoURL}
                                                            className="input input-bordered hidden w-full"
                                                        />
                                                        <label className="label">
                                                            <span className="label-text">Name</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            readOnly
                                                            value={user?.displayName}
                                                            className="input input-bordered w-full"
                                                        />
                                                        <label className="label">
                                                            <span className="label-text">Delivery Man</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            value={selectedParcel.deliveryMan}
                                                            className="input input-bordered w-full"
                                                        />
                                                        <label className='text-black'>Review</label>
                                                        <textarea
                                                            type="text"
                                                            onChange={(e) => setReview(e.target.value)}
                                                            value={review}
                                                            className="textarea textarea-bordered h-24 w-full"
                                                        ></textarea>
                                                        {/* Submit Button */}
                                                        <button onClick={() => handleReviewSubmit(selectedParcel._id, review, selectedParcel.deliveryMan, selectedParcel.deliveryDate, user.photoURL)} className={`btn btn-info ${isReviewDone ? 'cursor-not-allowed opacity-50' : ''}`}>
                                                            Submit Review
                                                            <MdOutlineBookmark className="ml-4" />
                                                        </button>
                                                        <ToastContainer></ToastContainer>
                                                    </div>
                                                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                                </div>
                                            
                                        </div></> : <></>
                                    }</> 
                                }

                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyItems;