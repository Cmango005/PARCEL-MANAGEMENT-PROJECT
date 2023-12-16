import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineBookmark } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Book = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, watch, setValue } = useForm();

    const calculatePrice = (parcelWeight) => {
        const price = parseInt(parcelWeight * 50);
        return price;
    };
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());

    const orderDate = `${year}-${month}-${day}`;
    const status = 'pending'
   
    const onSubmit = async (data) => {
       
        console.log(data);

        const bookItem = {
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
            orderDate,
            status
        }

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast("Booking Confirm")
                }
            })

    };

    
    const watchParcelWeight = watch("parcelWeight", 0);
    useEffect(() => {
        setValue("price", calculatePrice(watchParcelWeight));
    }, [watchParcelWeight, setValue]);
    return (
        <div className="p-5" style={{background: "linear-gradient(135deg, #1ee3bf, #6e6bd8)"}}>
            <p className="text-center font-bold text-3xl">Place Your Order</p>
            <form onSubmit={handleSubmit(onSubmit)}>

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
                            {...register("userName", { required: true })}
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
                            {...register("email", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

               
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phoneNumber", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Items*</span>
                        </label>
                        <select defaultValue="default" {...register('itemName', { required: true })}
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
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input
                            type="date"
                            {...register("requestedDeliveryDate", { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
    
                <div className="flex gap-5">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Parcel Weight (kg)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Parcel Weight"
                            {...register("parcelWeight", { required: true })}
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
                            value={watch("price")}
                            {...register("price", { required: true })}
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
                            {...register("receiverName", { required: true })}
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
                            placeholder="Receiver's Phone Number"
                            {...register("receiverPhoneNumber", { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Parcel Delivery Address</span>
                    </label>
                    <textarea
                        placeholder="Parcel Delivery Address"
                        {...register("parcelDeliveryAddress", { required: true })}
                        required
                        className="textarea textarea-bordered h-24 w-full"
                    ></textarea>
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Delivery Address Latitude</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Delivery Address Latitude"
                        {...register("deliveryAddressLatitude", { required: true })}
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
                        {...register("deliveryAddressLongitude", { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn">
                    Book Parcel <MdOutlineBookmark className="ml-4" />
                </button>
                <ToastContainer></ToastContainer>
            </form>
        </div>
    );
};

export default Book;