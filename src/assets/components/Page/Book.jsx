import { useContext, useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import cart from "../../../../public/cart.json"
// import Lottie from "lottie-react";

const Book = () => {
    const { user } = useContext(AuthContext)



    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = String(currentDate.getFullYear());

    const orderDate = `${year}-${month}-${day}`;
    const status = 'pending'
    const [parcelWeight, setParcelWeight] = useState("");
    const [price, setPrice] = useState("");
    const [deliveryAddressLatitude, setDeliveryAddressLatitude] = useState("");
    const [deliveryAddressLongitude, setDeliveryAddressLongitude] = useState("");


    const calculatePrice = () => {
        const parsedParcelWeight = parseFloat(parcelWeight);
        const calculatedPrice = isNaN(parsedParcelWeight) ? "" : parsedParcelWeight * 50;
        setPrice(calculatedPrice);
    };
    useEffect(() => {
        calculatePrice();
    }, [parcelWeight]);

    const onSubmit = async (event) => {

        event.preventDefault();

        const bookItem = {
            userName: user?.displayName,
            email: user?.email,
            phoneNumber: event.target.phoneNumber.value,
            itemName: event.target.itemName.value,
            parcelWeight: parseFloat(event.target.parcelWeight.value),
            receiverName: event.target.receiverName.value,
            receiverPhoneNumber: event.target.receiverPhoneNumber.value,
            parcelDeliveryAddress: event.target.parcelDeliveryAddress.value,
            requestedDeliveryDate: event.target.requestedDeliveryDate.value,
            deliveryAddressLatitude: parseFloat(event.target.deliveryAddressLatitude.value),
            deliveryAddressLongitude: parseFloat(event.target.deliveryAddressLongitude.value),
            price,
            orderDate,
            status
        };
        console.log(bookItem);
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
        event.target.reset();
    };

    return (
        <div className="p-5" style={{ background: "linear-gradient(135deg, #1ee3bf, #6e6bd8)" }}>
            <p className="text-center font-bold text-3xl">Place Your Order</p>
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
                        <select defaultValue="default" name="itemName" required className="select select-bordered w-full">
                            <option disabled value="default">Select an Item</option>
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
                            name="requestedDeliveryDate"
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
                            value={parcelWeight}
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
                            value={deliveryAddressLatitude}
                            onChange={(e) => setDeliveryAddressLatitude(e.target.value)}
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
                            value={deliveryAddressLongitude}
                            onChange={(e) => setDeliveryAddressLongitude(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
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