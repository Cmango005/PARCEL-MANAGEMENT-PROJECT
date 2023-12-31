import { MdSpatialTracking } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClock, FaSearch } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai";
import { BiBriefcase } from "react-icons/bi";
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
        fetch('https://parcel-management-server-steel.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);
    //console.log(users)
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
    const delivered = allOrder.filter(delivery => delivery.status === 'paid' || delivery.status === "delivered")

    const delivery = users.filter(user => user?.role === "Delivery-Man");
    //console.log(delivery.photoURL)
    const countDeliveredOrders = (deliveryMan) => {
        return allOrder.filter(order => order.status === "paid" && order.deliveryMan === deliveryMan.email).length;
    };
    const countDeliveredRate = (deliveryMan) => {
        const ratings = allOrder
            .filter((order) => order.status === "paid" && order.deliveryMan === deliveryMan.email)
            .map((order) => order.rate);
        const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
        return averageRating;
    };
    const [searched, setSearch] = useState("")
    const [result, setResult] = useState([])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSearchClick = () => {

        const filtered = allOrder.filter((item) =>
            item.type.toLowerCase().includes(searched.toLowerCase())
        );
        console.log(filtered);
        setResult(filtered);
    };

    return (
        <div data-theme="business">

            <section className="" >
                <Parallax blur={2} bgImage="https://i.ibb.co/SQdfwwG/pngtree-big-isolated-vehicle-vector-colorful-icons-flat-illustrations-of-delivery-by-image-1070281.jpg" bgImageAlt="the cat" strength={200}>
                    <div className=" flex flex-col lg:flex-row items-center justify-around mt-20" >

                        <div className="max-w-md p-10 ml-24">
                            <h1 className="text-4xl font-extrabold mb-4 text-center h">Efficient Parcel Management</h1>
                            <p className="text-lg font-semibold mb-6 text-center text-black">Track, manage, and deliver with ease.</p>
                            <div className="flex justify-center">
                                <div className="relative">

                                    <input
                                        type="text"
                                        placeholder="Search parcels..."
                                        name="searching"
                                        onChange={handleChange}
                                        className="py-2 px-4 rounded-full w-64 bg-white text-black md:w-96 focus:outline-none border"
                                    />
                                    <label onClick={handleSearchClick} htmlFor="my_modal_7" className="absolute right-0 top-0 flex justify-center h-full px-4 py-2 bg-blue-500 rounded-r-full focus:outline-none"><FaSearch /></label>
                                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box bg-white">
                                            {
                                                result.map((item, index) => <div key={index}>
                                                    <h3 className="text-lg font-bold text-black">{item.type}</h3>
                                                    <h3 className="text-lg font-bold text-black">{item.status}</h3>
                                                </div>)
                                            }

                                        </div>
                                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="p-32">
                            <Lottie animationData={search}></Lottie>
                        </div>
                    </div>
                </Parallax>

            </section>

            <section className="p-5">
                <div className="flex flex-col items-center space-y-10">
                    <div className="container mx-auto mt-20">
                        <h2 className="text-3xl font-bold mb-8 text-white text-center">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(200deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black "><MdSpatialTracking /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Real-Time Parcel Tracking</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Users can enjoy peace of mind with our real-time parcel tracking feature. Stay informed about the exact location of your package at every step of its journey, from pick-up to delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><SiFsecure /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Secure and Contactless Delivery</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Emphasizing the safety of your parcels, our app offers secure and contactless delivery options. Our delivery personnel are trained to handle packages with care, and users can opt for contactless delivery to minimize physical interaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(160deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><TbTruckDelivery /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Express Delivery Options</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Need your parcel delivered in a hurry? Choose our super-fast express delivery option. Experience the convenience of swift and timely deliveries for those urgent packages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(200deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><FaClock /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Time-Efficient</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Save time with our efficient parcel tracking and delivery options. Track and manage your parcels effortlessly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><AiOutlineControl /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">Customizable Options</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Tailor your delivery experience with customizable options. Choose delivery preferences that suit your needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group [perspective:1000px]">
                                <div className="h-96 rounded-lg  shadow-2xl relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(160deg)]">
                                    <div className="absolute inset-0 bg-teal-400 border-2 flex flex-col items-center justify-center">
                                        <div className="font-extrabold text-6xl text-black"><BiBriefcase /></div>
                                        <h3 className="text-xl font-bold mb-4 text-black">All Parcel Accepted</h3>
                                    </div>

                                    <div className=" bg-yellow-400 absolute inset-0 border-2 rounded-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
                                        <p className="text-black p-5 text-lg font-medium">
                                            Parcel SafePlace handles 100% of parcels, (any shape, size, or quantity), so residents can collect with confidence.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </section>
            <section className="min-h-screen flex flex-col space-y-20 justify-center items-center mb-10">
                <iframe src="https://lottie.host/embed/e3c679e1-0f82-448e-a957-babc0393a16c/ttCrwahYdC.json"></iframe>
                <div className="grid grid-rows-1 lg:grid-cols-3 gap-5 shadow-md rounded-sm">



                    <div className="border-2 p-3">
                        <p className="text-center">All Order</p>
                        <p className="text-center text-white"><CountUp end={allOrder.length} /></p>
                        <p className="text-center">From January 1st to February 1st</p>
                    </div>

                    <div className="border-2 p-3">
                        <p className="text-center">Total Delivered Items</p>
                        <p className="text-center text-white"><CountUp end={delivered.length} /></p>
                        <p className="text-center text-secondary">↗︎ 40 (2%)</p>
                    </div>

                    <div className="border-2 p-3">
                        <p className="text-center">Users</p>
                        <p className="text-center text-white"><CountUp end={users.length} /></p>
                        <p className="text-center">↘︎ 90 (14%)</p>
                    </div>



                </div>
                <iframe src="https://lottie.host/embed/e3c679e1-0f82-448e-a957-babc0393a16c/ttCrwahYdC.json"></iframe>
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
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center text-white">Choose Your Parcel Management Plan</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Basic Plan</h3>
                            <p className="text-gray-600 mb-4">
                                Ideal for occasional senders. Enjoy essential parcel tracking features with this cost-effective plan.
                            </p>
                            <ul className="list-disc text-gray-600 pl-6">
                                <li>Real-Time Tracking</li>
                                <li>Contactless Delivery</li>
                                <li>Standard Delivery Time</li>
                            </ul>
                            <p className="text-gray-800 font-bold mt-4">$9.99/month</p>
                        </div>

                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Premium Plan</h3>
                            <p className="text-gray-600 mb-4">
                                For regular users who want additional features. Unlock express delivery options and more with the Premium Plan.
                            </p>
                            <ul className="list-disc text-gray-600 pl-6">
                                <li>Real-Time Tracking</li>
                                <li>Contactless Delivery</li>
                                <li>Express Delivery Option</li>
                                <li>Customizable Preferences</li>
                            </ul>
                            <p className="text-gray-800 font-bold mt-4">$19.99/month</p>
                        </div>

                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Business Plan</h3>
                            <p className="text-gray-600 mb-4">
                                Tailored for businesses with high parcel volumes. Get advanced tracking, priority support, and more.
                            </p>
                            <ul className="list-disc text-gray-600 pl-6">
                                <li>Real-Time Tracking</li>
                                <li>Contactless Delivery</li>
                                <li>Express Delivery Option</li>
                                <li>Customizable Preferences</li>
                                <li>Priority Customer Support</li>
                            </ul>
                            <p className="text-gray-800 font-bold mt-4">Contact for Pricing</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <h2 className="text-4xl font-bold mb-4 text-center text-white">Our Happy Customer</h2>
                    <div>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >

                            {
                                allOrder.slice(0, 5).map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-96 flex flex-col items-center p-10 space-y-10">
                                            <img src={item.photo} alt="" className="h-32 w-56" />
                                            <p className="text-xl font-bold text-black">Review: {item.review}</p>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }


                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="mt-20">
                <div className="container mx-auto mt-8">
                    <h2 className="text-4xl font-bold mb-4 text-center text-white">Top 5 Delivery Men</h2>
                    <div className="">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}

                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"

                        >
                            {delivery.map((deliveryMan, index) => (
                                <SwiperSlide key={index} className="bg-white p-6 rounded-md h-28 shadow-md ">
                                    <div className="h-56 flex items-center space-x-40">
                                        <img
                                            src={deliveryMan.photoURL}

                                            className="h-32 w-56 mb-4"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-black">{deliveryMan.name}</h3>
                                            <h3 className="text-xl font-bold mb-2 text-black">{deliveryMan.email}</h3>
                                            <p className="text-gray-600 mb-4 text-base font-bold">
                                                Number of Parcels Delivered: {countDeliveredOrders(deliveryMan)}

                                            </p>
                                            <div className="rating rating-md">
                                                {Array.from({ length: Math.round(countDeliveredRate(deliveryMan)) }, (_, index) => (
                                                    <input key={index} type="radio" name={`rating-${index}`} readOnly className="mask mask-star-2 bg-orange-400" />
                                                ))}
                                            </div>
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