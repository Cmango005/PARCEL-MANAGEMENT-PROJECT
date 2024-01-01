import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineBorderColor, MdOutlineReviews, MdOutlineBookmark } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaHome, FaUsers } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { IoManSharp, IoCloseSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

// import Marquee from "react-fast-marquee";
import useDeliveryMan from "../Hooks/useDeliveryMan";
import useAdmin from "../Hooks/useAdmin";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FiLogOut } from "react-icons/fi";
// import Marquee from "react-fast-marquee";
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMen] = useDeliveryMan();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignOut = () => {

        logOut()

            .then(
                navigate("/")
            )
            .catch()
    }

    const [open, setOpen] = useState(false);

    return (
        <div className='' >
            <div className='text-xl rounded-xl hover:border-orange-300 lg:hidden hover:border-2 w-9 h-9 absolute z-10 left-5'>
                <button onClick={() => setOpen(true)}><GiHamburgerMenu className='w-8 h-8 mx-auto text-orange-500' /></button>
            </div>
            <div className='flex gap-2 ' >

                <div className='lg:w-72 md:w-72 w-0   '>
                    <div className={`absolute min-h-screen lg:sticky border-2  flex-grow bg-[#29AB87] lg:block md:block top-0  md:left-0 lg:left-0  z-10  duration-1000  w-60 ${open ? 'left-0' : '-left-96'}`}>
                        <div className=' relative md:hidden lg:hidden'>
                            <button onClick={() => setOpen(false)} className='w-8 h-8 mr-0 absolute z-20 right-1 '><IoCloseSharp className='h-full w-full hover:w-7 text-slate-100 '></IoCloseSharp></button>
                        </div>
                        <div>
                            <div className="flex justify-center py-2 space-x-1 ">
                                {/* <img className="h-10 w-14 shadow-2xl rounded-md" src="https://i.ibb.co/rHWB3R4/istockphoto-1195743934-612x612.jpg" alt="" /> */}
                                <p className="text-xl font-bold mt-2"><span className="text-black">Panda</span><span className="text-white">Parcel</span></p>

                            </div>
                            <hr className="mt-1 to-black" />
                            <ul className="menu p-5 space-y-5 text-base text-black ">
                                {isAdmin && <p className="text-2xl font-bold text-center">ADMIN</p>}
                                {isDeliveryMen && <p className="text-2xl font-bold text-center">DELIVERYMAN</p>}
                                {!isAdmin && !isDeliveryMen && <p className="text-2xl font-bold text-center">USER</p>}

                                <div className="space-x-3 flex flex-col justify-center items-center">
                                <img src={user?.photoURL} className="w-32 h-32 rounded-full mx-auto" alt="" />
                                    <iframe src="https://lottie.host/embed/65591004-7a06-4cbe-a02b-22ebf6d7e43a/xqFjmy78YR.json" className="h-10 w-44"></iframe>
                                 
                                       
                                        <p className="mx-auto text-md font-bold"> {user?.displayName}</p>
                                    
                                </div>

                                {/* <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">
                        <NavLink to='/dashboard/menu'><MdLocalGroceryStore />Items</NavLink>
                        </li> */}

                                {
                                    user ? <>{
                                        isAdmin ? <><li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg ">

                                            <NavLink to='/dashboard/parcels'><GoListOrdered />All Parcels</NavLink>
                                        </li>
                                            <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/all-user'><FaUsers />All User</NavLink>
                                            </li>
                                            <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/delivery-men'><IoManSharp />All Delivery Men</NavLink>
                                            </li>
                                            <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/statistics'><FcStatistics />Statistics</NavLink>
                                            </li></> :
                                            isDeliveryMen ? <><li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/my-delivery'><MdOutlineBorderColor />My Delivery List</NavLink>
                                            </li>
                                                <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                    <NavLink to='/dashboard/my-review'><MdOutlineReviews />My Reviews</NavLink>
                                                </li>

                                            </>
                                                : <>
                                                    <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                        <NavLink to='/dashboard/book'><MdOutlineBorderColor />Book a Parcel</NavLink>
                                                    </li>
                                                    <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                        <NavLink to='/dashboard/my-book'><MdOutlineBookmark />My Parcel</NavLink>
                                                    </li>
                                                    <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                        <NavLink to='/dashboard/profile'><CgProfile />My Profile</NavLink>
                                                    </li>
                                                </>
                                    } </> : <></>
                                }



                                <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">
                                    <NavLink to='/'><FaHome></FaHome> Go Back To Home</NavLink>
                                </li>
                                <hr />
                                <li>
                                    {
                                        user ? <button onClick={handleSignOut} className="advanced-button flex">LogOut<span className=""><FiLogOut></FiLogOut></span></button> : <></>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className='mt-10 w-full md:mt-0 lg:mt-0' data-theme="synthwave">
                    
                    <Outlet></Outlet>

                </div>


            </div>


        </div>
    );
};

export default Dashboard;