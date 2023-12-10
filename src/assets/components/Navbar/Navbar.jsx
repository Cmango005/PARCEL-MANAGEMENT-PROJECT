import { NavLink } from "react-router-dom";
import "./Navbar.css"

import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
    return (
        <div className="border-2 space-x-20 flex md:space-x-60 lg:space-x-60 back p-5 top-0 absolute left-0 mx-auto container justify-center shadow-2xl">
                <div className="flex ">
                    <img className="h-10 w-14 shadow-2xl" src="https://i.ibb.co/rHWB3R4/istockphoto-1195743934-612x612.jpg" alt="" />
                    <p className="text-xl font-bold mt-2 text-white"><span className="text-cyan-300 ">Panda</span>Parcel</p>
                </div>
                <div >
                    <nav className="hidden lg:flex lg:p-1 lg:space-x-10 lg:gap-6 ">
                        <NavLink to="/"><h3 className=" text-xl text-white font-extrabold ">Home</h3></NavLink>
                        <NavLink to="/dashboard"><h3 className="text-xl text-white font-extrabold">Dashboard</h3></NavLink>
                        <NavLink to="/notification" className="font-extrabold text-white text-4xl flex"><IoIosNotifications /></NavLink>
                    </nav>

                </div>
                
                
                

            </div>
    );
};

export default Navbar;