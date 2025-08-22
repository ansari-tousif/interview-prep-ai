import React, { useState, useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { UserContext } from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';

const Signup = ({ onClose }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter the full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    //Signup API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      })

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className=' bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col p-6 py-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-black text-lg font-semibold'>Create an Account</h1>
            <RxCross2 onClick={onClose} className='text-xl cursor-pointer' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xs text-gray-600'>Join us today by entering your details below</p>
            <p className='text-black'>Full Name</p>
            <input
              type="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='outline-none border border-amber-200 p-3' placeholder='John Doe' />
            <p className='text-black'>Email Address</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none border border-amber-200 p-3' placeholder='example@gmail.com' />
            <p className='text-black'>Password</p>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outline-none border border-amber-200 p-3 pr-10' placeholder='Min 8 Characters ' />
              <button onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 cursor-pointer right-3 flex items-center'>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <button onClick={handleSignup} className='bg-black text-white py-3 flex items-center justify-center rounded-lg'>SIGNUP</button>
          </div>
          <p className='mt-2 text-black text-sm'>Already have an account? <span className='text-amber-500'>Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default Signup