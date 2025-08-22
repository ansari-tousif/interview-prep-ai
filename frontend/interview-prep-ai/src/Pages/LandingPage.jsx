import React, { useContext, useState } from 'react'
import HeroImg from '../assets/Hero_Img.png'
import { APP_FEATURES } from '../utils/data'
import { LuSparkles } from 'react-icons/lu'
import Login from './Auth/Login'
import { UserContext } from '../Context/userContext'
import ProfileInfoCard from '../Components/Cards/profileInfoCard'

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className='w-full min-h-screen bg-[#fffcef]'>
        <div className='w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />
        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          {/* Header */}
          <header className=' flex items-center justify-between mb-[200px]'>
            <div className='text-black font-bold text-xl'>Interview Prep AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button onClick={() => setIsModalOpen(true)} className='bg-gradient-to-r from-[#ff9324] to-[#e99a4b] p-2 text-sm rounded-full px-7 text-white font-semibold hover:bg-black py-2.5'>Login / Sign Up</button>
            )}
          </header>

          {/* Hero Section */}
          <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
            <div className='flex flex-col gap-2 mb-6'>
              <div className='text-[13px] w-fit flex gap-2 items-center font-semibold px-3 py-1 rounded-full text-amber-600 border border-amber-300 bg-amber-100'>
                <LuSparkles />  AI Powered</div>
              <h1 className='text-black text-3xl md:text-5xl font-medium leading-tight'>Ace Interviews With <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%]'>AI-Powered</span>
                <span> Learning</span>
              </h1>
            </div>

            <div className='w-full md:w-1/2'>
              <p className='text-gray-900 mr-0 lg:mr-20 mb-6'>Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.</p>
              <button className='text-white bg-black px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors'>Get Started</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-screen relative z-10 mb-56'>
        <div>
          <section className='flex items-center justify-center -mt-36'>
            <img src={HeroImg} alt="Hero-Img" className='w-[80vw] rounded-lg border border-amber-200' />
          </section>
        </div>

        <div className='w-full min-h-screen bg-[#fffcef] mt-10'>
          <div className='container mx-auto px-4 pt-10 pb-20'>
            <section className='mt-5'>
              <h2 className='font-semibold text-2xl text-center mb-12'>Features That Make You Shine</h2>

              <div className='flex flex-col items-center justify-center gap-8'>
                {/* first 3 cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div key={feature.id} className='bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
                      <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                      <p className='text-gray-600'>{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Next 2 cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id} className='bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
                      <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                      <p className='text-gray-600'>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {isModalOpen && <Login onClose={() => setIsModalOpen(false)} />}

        <p className="text-center mt-2 mb-1 font-bold">
            &copy; {new Date().getFullYear()} | All Rights Reserved
          </p>
      </div>
    </>
  )
}

export default LandingPage