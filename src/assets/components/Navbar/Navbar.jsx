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
                                <div className="origin-top-right absolute right-0 mt-2 w-60 backdrop-blur bg-transparent rounded-md shadow-lg   ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="p-4 space-y-2 flex flex-col items-center"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="dropdown-menu-button"
                                    >
                                        <h3 className="text-center text-slate-100 text-lg font-semibold flex">{user.displayName}<span className=" text-3xl text-center lg:hidden"><NavLink to="/notification"><IoIosNotifications /></NavLink></span></h3>
                                        <h3 className="text-center text-slate-100 text-lg font-semibold">{user.email}</h3>
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
    );
};

export default Navbar;