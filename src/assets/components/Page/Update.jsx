import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from "react-router-dom";

const Update = () => {
    const order = useLoaderData();
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, watch, setValue } = useForm();
   
    // Calculate price based on parcel weight
    const calculatePrice = (parcelWeight) => {
        const price = parseInt(parcelWeight * 50);
        return price;
    };
    
   
    // Handle form submission
    const onUpdate = async (data) => {
        // Perform any additional logic or API calls here
        console.log(data);

        const updateItem = {
            userName: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            itemName: data.itemName,
            parcelWeight: data.parcelWeight,
            receiverName: data.receiverName,
            receiverPhoneNumber: data.receiverPhoneNumber,
            parcelDeliveryAddress: data.parcelDeliveryAddress,
            requestedDeliveryDate: data.requestedDeliveryDate,
            deliveryAddressLatitude: data.deliveryAddressLatitude,
            deliveryAddressLongitude: data.deliveryAddressLongitude,
            price: data.price,
            
            
        }
        
        fetch(`http://localhost:5000/order/${order._id}`, {
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

    // Watch for changes in parcel weight and update the price accordingly
    const watchParcelWeight = watch("parcelWeight", 0);
    useEffect(() => {
        setValue("price", calculatePrice(watchParcelWeight));
    }, [watchParcelWeight, setValue]);

    return (
        <div className="p-5">
            <p className="text-center font-bold text-3xl">Update Your Order</p>
            <form onSubmit={handleSubmit(onUpdate)}>
                {/* Name (Auto-filled from the logged-in user, read-only) */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        readOnly
                        value={user?.displayName} // Replace with actual value
                        {...register("userName", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Email (Auto-filled from the logged-in user, read-only) */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        readOnly
                        value={user?.email} // Replace with actual value
                        {...register("email", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Phone Number */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        defaultValue={order?.phoneNumber}
                        {...register("phoneNumber", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Parcel Type */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Items*</span>
                    </label>
                    <select defaultValue={order?.itemName} {...register('itemName', { required: true })}
                        className="select select-bordered w-full">
                        <option disabled value="default">Select a Item</option>
                        <option value="apple">Apples</option>
                        <option value="banana">Bananas</option>
                        <option value="carrot">Carrots</option>
                        <option value="broccoli">Broccoli</option>
                        <option value="milk">Milk</option>
                        <option value="egg">Eggs</option>
                        <option value="chicken">Chicken Breast</option>
                        <option value="rice">Rice</option>
                        <option value="pasta">Pasta</option>
                        <option value="tomato">Tomatoes</option>
                        <option value="spinach">Spinach</option>
                        <option value="cheese">Cheese</option>
                        <option value="orange">Oranges</option>
                        <option value="coffee">Ground Coffee</option>
                        <option value="beef">Beef</option>
                        <option value="juice">Orange Juice</option>
                        <option value="soda">Soda</option>

                    </select>
                </div>

                {/* Parcel Weight */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Parcel Weight (kg)</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Parcel Weight"
                        defaultValue={order?.parcelWeight}
                        {...register("parcelWeight", { required: true, min: 0 })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Receiver's Name */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Receivers Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Receiver's Name"
                        defaultValue={order?.receiverName}
                        {...register("receiverName", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Receiver's Phone Number */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Receivers Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Receiver's Phone Number"
                        defaultValue={order?.receiverPhoneNumber}
                        {...register("receiverPhoneNumber", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Parcel Delivery Address */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Parcel Delivery Address</span>
                    </label>
                    <textarea
                        placeholder="Parcel Delivery Address"
                        defaultValue={order?.parcelDeliveryAddress}
                        {...register("parcelDeliveryAddress", { required: true })}
                        required
                        className="textarea textarea-bordered h-24 w-full"
                    ></textarea>
                </div>

                {/* Requested Delivery Date */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Requested Delivery Date</span>
                    </label>
                    <input
                        type="date"
                        defaultValue={order?.requestedDeliveryDate}
                        {...register("requestedDeliveryDate", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Delivery Address Latitude */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Delivery Address Latitude</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Delivery Address Latitude"
                        defaultValue={order?.deliveryAddressLatitude}
                        {...register("deliveryAddressLatitude", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Delivery Address Longitude */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Delivery Address Longitude</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Delivery Address Longitude"
                        defaultValue={order?.deliveryAddressLongitude}
                        {...register("deliveryAddressLongitude", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Price (Auto Calculated from the Parcel Weight Input) */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        readOnly
                        defaultValue={order?.price}
                        value={watch("price")}
                        {...register("price", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Book Button */}
                <button type="submit" className="btn">
                    Update Booking <MdUpdate className="ml-4" />
                </button>
                <ToastContainer></ToastContainer>
            </form>
        </div>
    );
};

export default Update;
