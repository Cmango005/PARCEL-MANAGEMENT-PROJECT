import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Map, { Marker } from 'react-map-gl';
import { FaLocationPin } from "react-icons/fa6";
import "mapbox-gl/dist/mapbox-gl.css"
const MyDeliverItems = () => {
    const { user } = useContext(AuthContext);

    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
    const myDelivery = allOrder.filter(my => my.deliveryMan === user?.email);
    const handleDeliver = async (id, deliveryDate, deliveryMan) => {
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'delivered', deliveryDate, deliveryMan })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = allOrder.filter(order => order._id !== id);
                    const updated = allOrder.find(order => order._id === id);
                    updated.status = 'delivered';
                    updated.deliveryMan = deliveryMan;
                    updated.deliveryDate = deliveryDate;
                    const newOrder = [updated, ...remaining];
                    setAllOrder(newOrder)
                    toast('delivered')

                }
            });

    }
    const [selectedParcel, setSelectedParcel] = useState('');
    const handleParcelLocation = (parcel) => {
        console.log(parcel)
        setSelectedParcel(parcel);


    };
    return (
        <div className="p-1">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>

                        <th>Receivers Name</th>
                        <th>Requested Delivery Date</th>
                        <th>Approximate Delivery Date</th>
                        <th>Receivers Phone</th>
                        <th>Receivers Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {myDelivery.map((parcel, index) => (
                        <tr key={parcel._id} >

                            <td >{index + 1}.{parcel.receiverName}</td>
                            <td>{parcel.requestedDeliveryDate}</td>
                            <td>{parcel.deliveryDate}</td>
                            <td>{parcel.receiverPhoneNumber}</td>
                            <td>{parcel.parcelDeliveryAddress}</td>
                            <td>
                                {
                                    parcel.status === "delivered" ? <><button disabled className="">Already Delivered</button></> : <><button
                                        onClick={() => handleDeliver(parcel._id, parcel.deliveryDate, parcel.deliveryMan)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Deliver
                                    </button>
                                        <ToastContainer />
                                        <label htmlFor="my_modal_7" onClick={() => handleParcelLocation(parcel)} className="btn">See Location</label>

                                        {/* Put this part before </body> tag */}
                                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box">

                                                <Map
                                                    mapboxAccessToken={import.meta.env.VITE_Map_Token}
                                                    initialViewState={{
                                                        longitude: parseFloat(selectedParcel.deliveryAddressLongitude),
                                                        latitude: parseFloat(selectedParcel.deliveryAddressLatitude),
                                                        zoom: 3
                                                    }}
                                                    
                                                    style={{ width: 600, height: 400 }}
                                                    mapStyle="mapbox://styles/mapbox/streets-v12"
                                                >
                                                    {!isNaN(parseFloat(selectedParcel.deliveryAddressLongitude)) && !isNaN(parseFloat(selectedParcel.deliveryAddressLatitude)) && (
                                                        <Marker
                                                            longitude={parseFloat(selectedParcel.deliveryAddressLongitude)}
                                                            latitude={parseFloat(selectedParcel.deliveryAddressLatitude)}
                                                            anchor="bottom"
                                                            
                                                        >
                                                            <FaLocationPin size={30}/>
                                                        </Marker>
                                                    )}
                                                </Map>

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

export default MyDeliverItems;