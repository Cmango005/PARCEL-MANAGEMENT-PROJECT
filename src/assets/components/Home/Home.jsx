import { MdSpatialTracking } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClock, FaSearch } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai"
// import Navbar from "../Navbar/Navbar";

import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { Parallax } from "react-parallax";
import search from "../../../../public/search.json"
import Lottie from "lottie-react";
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
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);
    //console.log(users)
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/order')
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
        <div data-theme="business">

            <section className="" >
                <Parallax blur={10} bgImage="https://i.ibb.co/SQdfwwG/pngtree-big-isolated-vehicle-vector-colorful-icons-flat-illustrations-of-delivery-by-image-1070281.jpg" bgImageAlt="the cat" strength={200}>
                    <div className=" flex items-center justify-around" >

                        <div className="max-w-md p-10">
                            <h1 className="text-4xl font-extrabold mb-4 text-center h">Efficient Parcel Management</h1>
                            <p className="text-lg font-semibold mb-6 text-center text-black">Track, manage, and deliver with ease.</p>
                            <div className="flex justify-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search parcels..."
                                        className="py-2 px-4 rounded-full w-64 bg-white text-black md:w-96 focus:outline-none border"
                                    />
                                    <button className="absolute right-0 top-0 h-full px-4 py-2 bg-blue-500 rounded-r-full focus:outline-none">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-40">
                            <Lottie animationData={search}></Lottie>
                        </div>
                    </div>
                </Parallax>

            </section>

            <section className="p-5">
                <div className="flex flex-col items-center space-y-10">
                    <div className="container mx-auto mt-20">
                        <h2 className="text-3xl font-bold mb-8 text-white wel">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1: Real-Time Parcel Tracking */}
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(200deg)]">
                                    <div className="absolute inset-0 bg-yellow-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black "><MdSpatialTracking /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Real-Time Parcel Tracking</h3>
                                    </div>

                                    <div className=" bg-white absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black">
                                            Users can enjoy peace of mind with our real-time parcel tracking feature. Stay informed about the exact location of your package at every step of its journey, from pick-up to delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 bg-yellow-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><SiFsecure /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Secure and Contactless Delivery</h3>
                                    </div>

                                    <div className=" bg-white absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black">
                                            Emphasizing the safety of your parcels, our app offers secure and contactless delivery options. Our delivery personnel are trained to handle packages with care, and users can opt for contactless delivery to minimize physical interaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(160deg)]">
                                    <div className="absolute inset-0 bg-yellow-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><TbTruckDelivery /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Express Delivery Options</h3>
                                    </div>

                                    <div className=" bg-white absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black">
                                            Need your parcel delivered in a hurry? Choose our super-fast express delivery option. Experience the convenience of swift and timely deliveries for those urgent packages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(200deg)]">
                                    <div className="absolute inset-0 bg-yellow-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><FaClock /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Time-Efficient</h3>
                                    </div>

                                    <div className=" bg-white absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black">
                                            Save time with our efficient parcel tracking and delivery options. Track and manage your parcels effortlessly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 bg-yellow-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><AiOutlineControl /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Customizable Options</h3>
                                    </div>

                                    <div className=" bg-white absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black">
                                            Tailor your delivery experience with customizable options. Choose delivery preferences that suit your needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row border-2 border-yellow-400 top-0 left-0 shadow-md self-end rounded-sm">

                        <div className="stats shadow">

                            <div className="stat place-items-center">
                                <div className="stat-title">All Order</div>
                                <div className="stat-value text-white"><CountUp end={allOrder.length} /></div>
                                <div className="stat-desc">From January 1st to February 1st</div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-title">Total Delivered Items</div>
                                <div className="stat-value text-white"><CountUp end={delivered.length} /></div>
                                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-title">Users</div>
                                <div className="stat-value text-white"><CountUp end={users.length} /></div>
                                <div className="stat-desc">↘︎ 90 (14%)</div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
            <section className="bg-gradient-to-b from-emerald-200 to-emerald-500 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-1">Experience the Future of Parcel Management</h2>
                    <p className="text-lg mb-8 px-16">
                        Our advanced parcel management system is designed to provide you with a seamless experience. Enjoy a combination of cutting-edge technology and user-friendly design.
                    </p>
                    <button className="bg-yellow-400 text-blue-900 py-2 px-6 rounded-full text-lg font-bold hover:bg-yellow-500 transition duration-300">
                        Get Started
                    </button>
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

                                            className="h-32 w-56 mb-4"
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