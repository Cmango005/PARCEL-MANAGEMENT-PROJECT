import { MdSpatialTracking } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const Home = () => { 
    return (
        <div style={{background: "linear-gradient(270deg, #fa6fdc, #6e6bd8)"}}>
            <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/SQdfwwG/pngtree-big-isolated-vehicle-vector-colorful-icons-flat-illustrations-of-delivery-by-image-1070281.jpg')" }}>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-extrabold mb-4">Efficient Parcel Management</h1>
                        <p className="text-lg mb-6">Track, manage, and deliver with ease.</p>
                        <div className="flex justify-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search parcels..."
                                    className="py-2 px-4 rounded-full w-64 text-black md:w-96 focus:outline-none"
                                />
                                <button className="absolute right-0 top-0 h-full px-4 py-2 bg-blue-500 rounded-r-full focus:outline-none">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                   
                </div>
            </section>
            <section className="mt-20">
                <div className="container mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">Top 5 Delivery Men</h2>
                   
                </div>
            </section>
            
            <Footer></Footer>
        </div>
    );
};

export default Home;