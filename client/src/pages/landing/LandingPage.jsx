import React from 'react'
import Wave from '../../components/LandingFooter'
import NavBar from '../../components/NavBar'
import HeroRight from "../../assets/hero-right.png"

const LandingPage = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col">
        <div className="bg-[#F2FAFA] flex-grow px-20">
            <NavBar />
            <div className='flex justify-center '>
                <div className='flex flex-col md:max-w-[600px] md:pr-32 mt-20'>
                    <div>
                        <p className='text-4xl  font-extrabold tracking-wide'>Are you looking for <br /> <p className='text-primary mt-2'> Freelancers ?</p></p>                        
                    </div>
                    <div className='mt-4'>
                    <p className='text-light font-normal'>Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice</p>
                    </div>
                    <div className='mt-16'>
                        <form>
                            <div className='flex flex-col'>
                            <label className='mb-1 ml-1' htmlFor="email">Email</label>
                            <input className='h-10 px-4 rounded-2xl mb-6 outline-none' type="email" name="email" id="email" placeholder='example@example.com' />
                            <label className='mb-1 ml-1' htmlFor="password">Password</label>
                            <input className='h-10 px-4 rounded-2xl outline-none' type="password" name="password" id="password" placeholder='Enter your Password' />
                            </div>
                            <div className='flex justify-center mt-12'>
                                <button onClick={(e)=>e.preventDefault()} className='px-6 py-2 rounded-3xl bg-black text-white' type='submit'>SIGN IN </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='mt-10 hidden md:block'>
                    <img src={HeroRight} alt="hero-image" />
                </div>
            </div>
        </div>
        <Wave />
    </div>
  )
}

export default LandingPage