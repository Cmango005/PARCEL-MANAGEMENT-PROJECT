/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
// import Navbar from "../Navbar/Navbar";
import login from "../../../../public/login.json"
import Lottie from "lottie-react";


const Login = () => {

    const { logIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password')
        logIn(email, password)
            .then(result => {
                console.log(result.user)

                toast('Login successful')
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleSignInGoogle = () => {
        const provider = new GoogleAuthProvider();

        googleSignIn(provider)

            .then(Result => {

                console.log(Result);

                const userInfo = {
                    photoURL: Result.user.photoURL,
                    name: Result.user.displayName,
                    email: Result.user.email
                }
                fetch('https://parcel-management-server-steel.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.insertedId) {
                            toast('sign in with google successful')
                        }

                    })


                navigate(location?.state ? location.state : "/")

            })

            .catch()

    }

    return (
        <div>
            <section className="hero bg-base-200 " >


                <div className="flex items-center justify-between  space-x-28 p-5 mt-14">



                    <div className="flex flex-col items-center justify-center login-form  w-3/5 p-5  inset-0 h-screen border bg-transparent backdrop-blur shadow-2xl">
                        <p className="text-center text-xl font-bold ">Welcome To PandaParcel</p>
                        <form onSubmit={handleLogin} >
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-cyan-300 hover:bg-blue-700 w-full  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Login
                                </button>
                            </div>
                            <ToastContainer />
                        </form>

                        <div className="text-center">
                            <p className=" font-semibold">
                                Don't have an account? Register Now{' '} <br />
                                <NavLink to="/registration">
                                    <button className="btn btn-outline w-full btn-info mt-2 hover:bg-gradient-to-r hover:from-white hover:via-white hover:to-transparent">
                                        Registration
                                    </button>

                                </NavLink>
                            </p>
                            <p className="text-center mb-1 p-1 ">OR Sign Up With</p>
                            <button onClick={handleSignInGoogle} className="btn btn-accent w-full  mb-3 bg-cyan-300 hover:bg-cyan-700 px-4 py-2 rounded">
                                GOOGLE <FcGoogle />
                            </button>
                        </div>


                    </div>


                    <div>
                        <p className="font-bold text-3xl  ">Login now...</p>
                        <Lottie animationData={login} className="h-min"></Lottie>
                    </div>
                </div>


            </section>

        </div>
    );
};

export default Login;