import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Signup from './Signup';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../Context/userContext';
import { validateEmail } from '../../utils/helper';

const Login = ({ onClose }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('')

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      onClose();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className=' bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col p-6 py-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-black text-lg font-semibold'>Welcome Back</h1>
            <RxCross2 onClick={onClose} className='text-xl cursor-pointer' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xs text-gray-600'>Please enter your details to log in</p>
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
            <button onClick={handleLogin} className='bg-black text-white py-3 flex items-center justify-center rounded-lg'>LOGIN</button>
          </div>
          <p className='mt-2 text-black text-sm'>Don't have an account? <span onClick={() => setIsModalOpen(true)} className='text-amber-500 cursor-pointer'>SignUp</span></p>
        </div>
      </div>
      {isModalOpen && <Signup onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Login