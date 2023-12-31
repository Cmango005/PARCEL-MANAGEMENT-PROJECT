import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import { FiLogOut } from 'react-icons/fi';
import { IoIosNotifications } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
   
    return (
        <div className="space-x-20 flex md:space-x-60 lg:space-x-60 back z-10 p-5 top-0 fixed mx-auto container justify-between shadow-2xl bg-transparent backdrop-blur">
            <div className="flex space-x-5">

                <img src="https://i.ibb.co/GFB9Lcr/Black-and-White-Monogram-Business-Logo-1.gif" alt="" className="h-16 w-32" />
            </div>
            <div className="flex space-x-10 items-center">
                <div >
                    <nav className="hidden lg:flex  lg:space-x-5 lg:gap-6 ">
                        <NavLink to="/"><p className=" text-lg text-black font-medium ">Home</p></NavLink>
                        <NavLink to="/dashboard"><h3 className="text-lg text-black font-medium">Dashboard</h3></NavLink>
                        <div className="indicator">
                            <span className="indicator-item badge badge-secondary bg-pink-500 text-white">0</span>
                            <NavLink to="/notification" ><button className=" text-black font-medium text-4xl"><IoIosNotifications /></button></NavLink>
                        </div>
                       
                    </nav>

                </div>

                <div>
                    {
                        user ?
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    type="button"
                                    className="inline-flex items-center justify-center w-10 h-10 text-gray-700 border border-gray-300 rounded-full focus:outline-none"
                                    id="dropdown-menu-button"
                                    aria-expanded={isOpen ? 'true' : 'false'}
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt="Dropdown Icon"
                                        className="h-full rounded-full shadow-2xl"
                                    />
                                </button>
                                {isOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-60 backdrop-blur bg-transparent rounded-md shadow-lg z-20 ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="p-4 space-y-2 flex flex-col items-center"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="dropdown-menu-button"
                                        >
                                            <h3 className="text-center text-blue-400 text-lg font-semibold flex">{user.displayName}<span className=" text-3xl text-center lg:hidden"><NavLink to="/notification"><IoIosNotifications /></NavLink></span></h3>
                                            <h3 className="text-center text-blue-400 text-lg font-semibold">{user.email}</h3>
                                            <div className="lg:hidden"><NavLink to="/"><h3 className=" text-xl unique-button  mt-3 text-white font-extrabold text-center">Home</h3></NavLink></div>
                                            <NavLink to="/dashboard"><button className="text-xl font-extrabold unique-button mb-3">Dashboard</button></NavLink>
                                            <button onClick={handleSignOut} className="advanced-button flex">LogOut <span className="mt-1"><FiLogOut></FiLogOut></span></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className=" flex">

                                <Link to='/login'><button className="advanced-button">Login</button></Link>
                            </div>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;