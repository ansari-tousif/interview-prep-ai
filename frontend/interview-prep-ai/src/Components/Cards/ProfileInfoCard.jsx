import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    }

  return (
    user && (
    <div className='flex flex-col items-start'>
        <h3 className='text-[15px] text-black font-bold'>{user.name || ""}</h3>
        <button onClick={handleLogout} className='text-sm text-amber-600 font-semibold cursor-pointer hover:underline'>Logout</button>
    </div>
  ))
}

export default ProfileInfoCard;