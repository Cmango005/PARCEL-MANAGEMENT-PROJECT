import { useContext, useEffect, useState } from "react";

import { MdUpdate } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from "react-router-dom";

const Update = () => {
    const order = useLoaderData();
    const { user } = useContext(AuthContext)
    const [parcelWeight, setParcelWeight] = useState("");
    const [price, setPrice] = useState("");



    const calculatePrice = () => {
        const parsedParcelWeight = parseFloat(parcelWeight);
        const calculatedPrice = isNaN(parsedParcelWeight) ? "" : parsedParcelWeight * 50;
        setPrice(calculatedPrice);
    };
    useEffect(() => {
        calculatePrice();
    }, [parcelWeight]);

    // Handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();

        const updateItem = {
            userName: user?.displayName,
            email: user?.email,
            phoneNumber: event.target.phoneNumber.value,
            type: event.target.type.value,
            parcelWeight: parseFloat(event.target.parcelWeight.value),
            receiverName: event.target.receiverName.value,
            receiverPhoneNumber: event.target.receiverPhoneNumber.value,
            parcelDeliveryAddress: event.target.parcelDeliveryAddress.value,
            requestedDeliveryDate: event.target.requestedDeliveryDate.value,
            deliveryAddressLatitude: parseFloat(event.target.deliveryAddressLatitude.value),
            deliveryAddressLongitude: parseFloat(event.target.deliveryAddressLongitude.value),
            price,


        }

        fetch(`https://parcel-management-server-steel.vercel.app/order/${order._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast("Update Confirm")
                }
            })
    };



    return (
        <div className="p-5">
            <p className="text-center font-bold text-3xl">Update Your Order</p>
            <form onSubmit={onSubmit}>

                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
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
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            readOnly
                            value={user?.email}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        defaultValue={order?.phoneNumber}
                        placeholder="Phone Number"
                        name="phoneNumber"
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Items*</span>
                        </label>
                        <input type="text"
                            defaultValue={order?.type}
                            readOnly
                            name="type"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input
                            type="date"
                            name="requestedDeliveryDate"
                            defaultValue={order?.requestedDeliveryDate}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Parcel Weight */}
                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Parcel Weight (kg)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Parcel Weight"
                            name="parcelWeight"
                            defaultValue={order.parcelWeight}
                            onChange={(e) => setParcelWeight(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            readOnly
                            value={price}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Receivers Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Receiver's Name"
                            defaultValue={order?.receiverName}
                            name="receiverName"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Receivers Phone Number</span>
                        </label>
                        <input
                            type="tel"
                            defaultValue={order?.receiverPhoneNumber}
                            placeholder="Receiver's Phone Number"
                            name="receiverPhoneNumber"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Parcel Delivery Address */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Parcel Delivery Address</span>
                    </label>
                    <textarea
                        placeholder="Parcel Delivery Address"
                        defaultValue={order?.parcelDeliveryAddress}
                        name="parcelDeliveryAddress"
                        required
                        className="textarea textarea-bordered h-24 w-full"
                    ></textarea>
                </div>

                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Delivery Address Latitude"
                            name="deliveryAddressLatitude"
                            defaultValue={order?.deliveryAddressLatitude}

                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Delivery Address Longitude</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Delivery Address Longitude"
                            name="deliveryAddressLongitude"
                            defaultValue={order?.deliveryAddressLongitude}

                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Book Button */}
                <button type="submit" className="btn">
                    Update <MdUpdate className="ml-4" />
                </button>
                <ToastContainer></ToastContainer>
            </form>
        </div>
    );
};

export default Update;
