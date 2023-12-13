

const Footer = () => {
    return (
        <footer style={{ background: "linear-gradient(270deg, #1ee3bf, #6e6bd8)" }} className=" text-white py-8 mt-4">
            <div className="container mx-auto flex flex-col space-y-3 items-center bg-opacity-0">
                <div className="mb-4 flex flex-col items-center">
                    <div className="flex p-5">
                        <img className="h-10 w-14 shadow-2xl" src="https://i.ibb.co/rHWB3R4/istockphoto-1195743934-612x612.jpg" alt="" />
                        <p className="text-xl font-bold mt-2"><span className="text-cyan-300">Panda</span>Parcel</p>
                    </div>
                    <p className="text-white font-medium text-xl">Efficient and Reliable Parcel Services</p>
                </div>

                <div className="flex space-x-4 font-bold text-2xl mb-4">
                    <a href="#" className="text-white transition duration-300">Home</a>
                    <a href="#" className="text-white transition duration-300">Features</a>
                    <a href="#" className="text-white transition duration-300">About Us</a>
                    <a href="#" className="text-white transition duration-300">Contact</a>
                </div>

                <div className="flex space-x-4">
                    <a href="#" className="text-white transition duration-300">
                        <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="#" className="text-white transition duration-300">
                        <i className="fab fa-twitter-square"></i>
                    </a>
                    <a href="#" className="text-white transition duration-300">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>

                <div className="font-semibold text-xl">
                    <p className="text-white">&copy; 2023 <span className="text-cyan-300">Panda</span> Parcel Management. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;