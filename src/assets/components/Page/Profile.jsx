import { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const { user } = useContext(AuthContext)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {

            setProfileImage(file);
        }
    };


    const handleUpdateProfile = () => {

        console.log('Selected Profile Image:', profileImage);
    };
    return (
        <div className="h-5/6 mx-auto flex justify-center items-center  ">
            <div className="w-2/5 mx-auto p-6 rounded-md  " >
                <div className=" text-center">
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-32 h-32 rounded-lg mx-auto mb-4"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="profileImageInput"
                        onChange={handleImageUpload}
                    />
                    <label
                        htmlFor="profileImageInput"
                        className="cursor-pointer btn btn-accent"
                    >
                        Upload Profile Picture
                    </label>
                </div>
                {/* User Information */}
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Name:</label>
                    <span className="text-white">{user?.displayName}</span>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Email:</label>
                    <span className="text-white">{user?.email}</span>
                </div>
                {/* Update Button */}
                <button
                    onClick={handleUpdateProfile}
                    className="btn btn-success text-white px-4 py-2 rounded"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;