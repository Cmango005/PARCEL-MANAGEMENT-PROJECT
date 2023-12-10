import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import Navbar from "../Navbar/Navbar";



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



                navigate(location?.state ? location.state : "/")

            })

            .catch()

    }

    return (
        <div>
            <section className="hero min-h-screen bg-base-200 relative" style={{ backgroundImage: "url('https://i.ibb.co/ns4md2T/15-Bootstrap-login-forms32.webp')" }}>

                
                    <div className="absolute inset-0 backdrop-blur ">

                        <div className="login-box h-4/5 ">
                            <p  className="text-center wel text-xl font-bold text-white">Welcome To PandaParcel</p>
                            <form onSubmit={handleLogin} className="">
                                <div className="form-control user-box">

                                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control user-box">

                                    <input type="password" placeholder="password" name="password" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-1">
                                    <button className="">Login</button>
                                    <ToastContainer></ToastContainer>
                                </div>
                            </form>

                            <div className="text-center ">
                                <p className="ml-2 text-white font-semibold ">Have Not Account? Register Now<NavLink to='/registration'><button className="btn btn-outline btn-info mt-2">Registration</button></NavLink></p>
                                <p className="text-center mb-1 p-1 text-white">OR Sign Up With</p>
                                <button onClick={handleSignInGoogle} className="btn btn-accent text-white mb-3 ">GOOGLE <FcGoogle></FcGoogle></button>
                               
                            </div>
                        </div>
                    </div>
                    
                
                <Navbar></Navbar>
            </section>
            
        </div>
    );
};

export default Login;