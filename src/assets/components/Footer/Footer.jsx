import { FaFacebookSquare, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
    return (
        <footer data-theme="business" className=" text-white py-8 mt-4">

            <div className="flex flex-col lg:flex-row justify-around  items-start">
                <div className="lg:text-left lg:mr-12">
                    <div className="flex ">
                    <p className="bg-pink-400 font-semibold text-xl text-white p-3"><span className="text-black">Panda</span>Parcel</p>

                    </div>
                    <p className="flex items-center gap-1"><MdOutlineMail /> pandaparcel@gmail.com</p>
                    <p className="flex items-center gap-1"><FaPhoneAlt /> +8801688132442</p>
                </div>

                <div className="flex flex-col mt-5 lg:mt-0 lg:mr-12">
                    <a href="#" className="text-white transition duration-300">Home</a>
                    <a href="#" className="text-white transition duration-300">Features</a>
                    <a href="#" className="text-white transition duration-300">About Us</a>
                    <a href="#" className="text-white transition duration-300">Contact</a>
                </div>
                <div className="flex space-x-4 mt-5 lg:mt-0">
                    <a
                        href="https://www.linkedin.com/in/mehedi-hasan-b57160290/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/Cmango005"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.facebook.com/Siam2442"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookSquare />
                    </a>
                    {/* Add more social media icons as needed */}
                </div>
            </div>
            <div className="font-semibold text-xl text-center">
                <p className="text-white">&copy; 2023 PandaParcel Management. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;