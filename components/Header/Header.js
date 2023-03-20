import { AuthContext } from '@/utils/userContext/UserContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { BiAlignMiddle, BiUserCircle } from "react-icons/bi";


const Header = () => {
    const [display, setDisplay] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)
    const { user, logOut } = useContext(AuthContext);
    console.log('====================================');
    console.log(user);
    console.log('====================================');


    const handleLogOut = () => {
        
            logOut()
                .then(res => {
                    setDisplayModal(false)
                 })
                .catch(err => console.log(err))
        
    }
    return (
        <div>
            {
            // sign out modal
                displayModal && <div className='fixed top-0 right-0 z-50  bg-[#071b3fbb] text-white text-lg font-medium w-full h-screen flex justify-center items-center'>
                    <div className='flex flex-col items-center p-10 bg-[#071b3f] w-[300px] rounded-xl'>
                        <h1>Are You Sure?</h1>
                        <div className='flex justify-around items-center w-full '>
                            <button className='cursor-pointer' onClick={handleLogOut}>Yes</button>
                            <button className='cursor-pointer' onClick={() => setDisplayModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            }

            <div className='' >
                <div className={` bg-[#fef] z-40 w-full  py-2   flex flex-col md:flex-row justify-around items-center`}>
                    <div className=" flex justify-around around items-center w-full  md:w-1/6">

                        {/* header logo and name  */}

                        <Link href='/' className={`font-bold flex  text-lg md:text-3xl`}>
                            <h1 className='text-[#071b3f]'>Rapid Job</h1>
                        </Link>
                        <button className='block md:hidden' onClick={() => setDisplay(!display)}><BiAlignMiddle></BiAlignMiddle></button>
                    </div>
                    {/* header links  */}
                    <div className={` flex  md:items-center  justify-center   flex-col md:flex-row   ${display ? 'flex' : 'hidden md:flex'}`} >
                        <div onClick={() => setDisplay(false)} className="  items-start flex flex-col md:flex-row py-12 md:py-1 ">
                            <Link className='md:mr-10 text-lg font-semibold my-1 hover:scale-105 duration-300' href='/'>Home</Link>
                            <Link className='md:mr-10 text-lg font-semibold my-1 hover:scale-105 duration-300' href='/about'>About Us</Link>


                            {
                                user ? <>
                                        <Link className='md:mr-10 text-lg font-semibold my-1 hover:scale-105 duration-300' href='/alljobs'>Find Job</Link>
                                        <Link className='md:mr-10 text-lg font-semibold my-1 hover:scale-105 duration-300' href='/postajob'>Post a Job</Link>
                                    <div className='my-1 '>
                                        {
                                            user?.email && <div className='bg-[#071b3f] h-8 w-8 rounded-full flex justify-center items-center'>
                                                <p className='text-lg font-semibold  text-white capitalize'>{user?.email.slice(0,1)}</p>
                                                
                                            </div>
                                        }
                                    </div>
                                    <button onClick={() => setDisplayModal(!displayModal)} className='md:mx-4 text-lg font-semibold my-1 text-[#071b3f]'>Sign Out</button>

                                </>
                                    : <Link className='md:mr-10 text-lg font-semibold my-1 hover:scale-105 duration-300' href='/join'>Join Now</Link>
                            }

                        </div>





                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;