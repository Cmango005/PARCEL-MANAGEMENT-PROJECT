import { NavLink, Outlet } from "react-router-dom";
import { MdLocalGroceryStore, MdOutlineBorderColor, MdOutlineReviews, MdOutlineBookmark } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaHome, FaUsers } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { IoManSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Marquee from "react-fast-marquee";
import useDeliveryMan from "../Hooks/useDeliveryMan";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMen] = useDeliveryMan();
    const { user } = useContext(AuthContext);

    return (
        <div className="flex">
            <div className="w-64 min-h-screen " style={{ background: "linear-gradient(270deg, #1ee3bf, #6e6bd8)" }}>
                <div className="flex justify-center py-2 space-x-1 ">
                    <img className="h-10 w-14 shadow-2xl rounded-md" src="https://i.ibb.co/rHWB3R4/istockphoto-1195743934-612x612.jpg" alt="" />
                    <p className="text-xl font-bold mt-2"><span className="text-cyan-100">Panda</span><span className="text-white">Parcel</span></p>

                </div>
                <hr className="mt-2" />
                <ul className="menu p-5 space-y-5 text-base text-white ">
                    <img src={user?.photoURL} className="w-32 h-32 rounded-full mx-auto" alt="" />
                    <p className="mx-auto text-2xl font-bold">Welcome Back <br /> {user?.displayName}</p>
                    <li className="flex hover:bg-gray-700 hover:rounded-lg">
                        <NavLink to='/dashboard/menu'><MdLocalGroceryStore />Items</NavLink>
                    </li>

                    {
                        user ? <>{
                            isAdmin ? <><li className="flex hover:bg-gray-700 hover:rounded-lg">

                                <NavLink to='/dashboard/parcels'><GoListOrdered />All Parcels</NavLink>
                            </li>
                                <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                    <NavLink to='/dashboard/all-user'><FaUsers />All User</NavLink>
                                </li>
                                <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                    <NavLink to='/dashboard/delivery-men'><IoManSharp />All Delivery Men</NavLink>
                                </li>
                                <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                    <NavLink to='/dashboard/statistics'><FcStatistics />Statistics</NavLink>
                                </li></> :
                                isDeliveryMen ? <><li className="flex hover:bg-gray-700 hover:rounded-lg">

                                    <NavLink to='/dashboard/my-delivery'><MdOutlineBorderColor />My Delivery List</NavLink>
                                </li>
                                    <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                        <NavLink to='/dashboard/my-review'><MdOutlineReviews />My Reviews</NavLink>
                                    </li>

                                </>
                                    : <>
                                        <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                            <NavLink to='/dashboard/book'><MdOutlineBorderColor />Book a Parcel</NavLink>
                                        </li>
                                        <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                            <NavLink to='/dashboard/my-book'><MdOutlineBookmark />My Parcel</NavLink>
                                        </li>
                                        <li className="flex hover:bg-gray-700 hover:rounded-lg">

                                            <NavLink to='/dashboard/profile'><CgProfile />My Profile</NavLink>
                                        </li>
                                    </>
                        } </> : <></>
                    }



                    <li className="flex hover:bg-gray-700 hover:rounded-lg">
                        <NavLink to='/'><FaHome></FaHome> Go Back To Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 bg-white">
                <div className="h-16" style={{ background: "linear-gradient(90deg, #1ee3bf, #6e6bd8)" }} >
                    <Marquee>
                        <div className="flex space-x-36">
                            <div className="flex items-center">
                                <img className="h-14 w-14 p-1" src="https://i.ibb.co/F30KhLp/moving-car.gif" alt="" />
                                <p className="text-lg font-semibold">Parcel On The Way</p>
                            </div>
                            <div className="flex items-center">
                                <img className="h-14 w-14 p-1" src="https://i.ibb.co/F30KhLp/moving-car.gif" alt="" />
                                <p className="text-lg font-semibold">Parcel On The Way</p>
                            </div>
                            <div className="flex items-center">
                                <img className="h-14 w-14 p-1" src="https://i.ibb.co/F30KhLp/moving-car.gif" alt="" />
                                <p className="text-lg font-semibold">Parcel On The Way</p>
                            </div>
                        </div>
                    </Marquee>
                </div>
                <hr className="" />
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;