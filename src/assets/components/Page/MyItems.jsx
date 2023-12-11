import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaStar, FaMoneyBill } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
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
            case "returned":
                return "bg-red-200";
            case "cancelled":
                return "bg-gray-200";
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
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        console.log("Submit button clicked");
        console.log(data);
        const submitReview = {
            userName: data.userName,
            review: data.review, // Change this to match the name in the form
        };
    
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(submitReview)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast("Review Submitted Successfully");
                }
            })
    };
    




    const renderPayButton = (status) => {
        if (status === "delivered") {
            return (
                <button className="btn btn-sm btn-success">
                    Pay<FaMoneyBill className="ml-2" />
                </button>
            );
        }
        return null;
    };
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
                        <th>items Type</th>
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
                            <td className="text-black">{parcel.itemName}</td>
                            <td className="text-black">{parcel.requestedDeliveryDate}</td>
                            <td className="text-black">{parcel.deliveryDate}</td>
                            <td className="text-black">{parcel.orderDate}</td>
                            <td className="text-black">{parcel.deliveryMan}</td>
                            <td className="text-black">{parcel.status}</td>
                            <td className="space-y-1">

                                {
                                    parcel.status === "on the way" ? <><img className="h-14 w-14 p-1" src="https://i.ibb.co/F30KhLp/moving-car.gif" alt="" /></> : <>
                                        {
                                            parcel.status === "delivered" ? <><div>
                                                <>
                                                    <button className="btn btn-sm btn-neutral" onClick={() => document.getElementById('my_modal_2').showModal()}>Review<FaStar className="" /></button>
                                                    <dialog id="my_modal_2" className="modal">
                                                        <div className="modal-box">
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                <div className="form-control w-full my-6">
                                                                    <label className="label">
                                                                        <span className="label-text">Name</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Name"
                                                                        readOnly
                                                                        value={user?.displayName}
                                                                        {...register("userName", { required: true })}
                                                                        className="input input-bordered w-full"
                                                                    />

                                                                </div>
                                                                <div className="form-control w-full my-6">
                                                                    <label className="label">
                                                                        <span className="label-text">Review</span>
                                                                    </label>
                                                                    <textarea
                                                                        placeholder="Review"
                                                                        {...register("review")}
                                                                        className="textarea textarea-bordered w-full"
                                                                    ></textarea>
                                                                </div>

                                                                {/* Book Button */}
                                                                <button type="submit" className="btn">
                                                                    Submit Review <MdOutlineBookmark className="ml-4" />
                                                                </button>
                                                                <ToastContainer></ToastContainer>
                                                            </form>
                                                            
                                                        </div>
                                                        <form method="dialog" className="modal-backdrop">
                                                            <button>close</button>
                                                        </form>
                                                    </dialog>
                                                </>
                                            </div>
                                                {renderPayButton(parcel.status)}</> :
                                                parcel.status === "pending" ?
                                                    <><Link to={`/dashboard/update/${parcel._id}`}><button className="btn btn-sm btn-warning">
                                                        Update<FaEdit className="" />
                                                    </button></Link>
                                                        <button onClick={() => handleCancel(parcel._id)} className="btn btn-sm btn-danger ">
                                                            Cancel<FaTrash className='' />
                                                        </button>
                                                        <ToastContainer></ToastContainer></> : <></>


                                        }
                                    </>
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