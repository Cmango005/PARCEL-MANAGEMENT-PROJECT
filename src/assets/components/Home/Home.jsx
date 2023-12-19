import { MdSpatialTracking } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { Parallax } from "react-parallax";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Home.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Home = () => { 
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://parcel-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);
    //console.log(users)
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('https://parcel-server.vercel.app/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
    const delivered = allOrder.filter(delivery => delivery.status === 'delivered')

    const delivery = users.filter(user => user?.role === "Delivery-Man");
    //console.log(delivery.photoURL)
    const countDeliveredOrders = (deliveryMan) => {
        return allOrder.filter(order => order.status === "delivered" && order.deliveryMan === deliveryMan.email).length;
    };
    return (
        <div style={{background: "linear-gradient(270deg, #1ee3bf, #6e6bd8)"}}>
            <section className="" >
            <Parallax blur={5} bgImage="https://i.ibb.co/SQdfwwG/pngtree-big-isolated-vehicle-vector-colorful-icons-flat-illustrations-of-delivery-by-image-1070281.jpg" bgImageAlt="the cat" strength={200}>
                    <div className="hero min-h-screen" >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md ">
                                <h1 className="text-4xl font-extrabold mb-4 text-white">Efficient Parcel Management</h1>
                                <p className="text-lg mb-6 text-white">Track, manage, and deliver with ease.</p>
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search parcels..."
                                            className="py-2 px-4 rounded-full w-64 bg-white text-black md:w-96 focus:outline-none"
                                        />
                                        <button className="absolute right-0 top-0 h-full px-4 py-2 bg-blue-500 rounded-r-full focus:outline-none">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Parallax>
                <Navbar></Navbar>
            </section>
           
            <section className="p-5">
                <div className="flex flex-col items-center space-y-10">
                    <div className="container mx-auto mt-20">
                        <h2 className="text-3xl font-bold mb-8 text-white wel">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1: Real-Time Parcel Tracking */}
                            <div className="  bg-slate-50 p-6 rounded-lg border-2 shadow-2xl">

                                <div className="font-extrabold text-6xl"><MdSpatialTracking /></div>
                                <h3 className="text-xl font-bold mb-4">Real-Time Parcel Tracking</h3>

                                <p className="text-gray-600">
                                    Users can enjoy peace of mind with our real-time parcel tracking feature. Stay informed about the exact location of your package at every step of its journey, from pick-up to delivery.
                                </p>
                            </div>

                            {/* Feature 2: Secure and Contactless Delivery */}
                            <div className="bg-gray-50 p-6 rounded-lg border-2 shadow-2xl">
                                <div className="font-extrabold text-6xl"><SiFsecure /></div>
                                <h3 className="text-xl font-bold mb-4">Secure and Contactless Delivery</h3>
                                <p className="text-gray-600">
                                    Emphasizing the safety of your parcels, our app offers secure and contactless delivery options. Our delivery personnel are trained to handle packages with care, and users can opt for contactless delivery to minimize physical interaction.
                                </p>
                            </div>

                            {/* Feature 3: Express Delivery Options */}
                            <div className="bg-white p-6 rounded-lg border-2 shadow-2xl">
                                <div className="font-extrabold text-6xl"><TbTruckDelivery /></div>
                                <h3 className="text-xl font-bold mb-4">Express Delivery Options</h3>
                                <p className="text-gray-600">
                                    Need your parcel delivered in a hurry? Choose our super-fast express delivery option. Experience the convenience of swift and timely deliveries for those urgent packages.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row lg:w-3/5 bg-white shadow-md border-2">

                        <div className="stat place-items-center">
                            <div className="stat-title"> Parcel Booked</div>
                            <div className="stat-value text-green-400"><CountUp end={allOrder.length} /></div>
                            <div className="stat-desc">From January 1st to February 1st</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Parcel Delivered</div>
                            <div className="stat-value text-yellow-400"><CountUp end={delivered.length} /></div>
                            <div className="stat-desc">↗︎ 90 (14%)</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Users</div>
                            <div className="stat-value text-red-400"><CountUp end={users.length} /></div>
                            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                        </div>


                    </div>
                </div>
            </section>
            <section className="mt-20">
                <div className="container mx-auto mt-8">
                    <h2 className="text-4xl font-bold mb-4 wel text-white">Top 5 Delivery Men</h2>
                    <div className="">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                            
                        >
                            {delivery.map((deliveryMan, index) => (
                                <SwiperSlide key={index} className="bg-white p-6 rounded-md h-28 shadow-md ">
                                    <div className="h-44 flex items-center space-x-40">
                                    <img
                                        src={deliveryMan.photoURL}

                                        className="h-24 w-24 rounded-full mb-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{deliveryMan.name}</h3>
                                        <p className="text-gray-600 mb-4 text-base font-bold">
                                            Number of Parcels Delivered: {countDeliveredOrders(deliveryMan)}

                                        </p>
                                    </div>
                                    </div>

                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>
                </div>
            </section>
            
            <Footer></Footer>
        </div>
    );
};

export default Home;