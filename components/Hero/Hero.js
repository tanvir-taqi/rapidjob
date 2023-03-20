import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const Hero = () => {
    return (
        <div className='bg-[#63a0e5b6] block md:mx-auto md:w-5/6 rounded-3xl my-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 relative md:py-24 md:mx-12'>
                <div className='p-4'>
                    <h1 className='text-4xl text-[#ffffff] font-bold font-mono py-3 '> Your Gateway to the Best Jobs-&gt;<span className='text-4xl text-[#333] font-bold font-mono py-3 '>&lt;-Find Your Dream Job Today</span> </h1>
                    <p className='text-lg '> At our job portal, we're committed to helping you find the best job opportunities that match your skills and experience. With our easy-to-use platform and comprehensive job listings, you'll be able to explore and apply to your dream jobs in just a few clicks. Join our community of successful job seekers today and take your career to new heights.</p>
                    <div className='py-4  flex justify-center'>
                        <Link href='/alljobs' className='md:px-6 md:py-2 px-3 py-1 border md:mx-3 mx-1 font-bold md:text-lg text-base text-[#071b3f] bg-[#fff] duration-500 hover:scale-105 before:duration-500  relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:bg-[#071b3f] before:transition-transform before:content-[""] hover:text-white before:hover:scale-y-100 before:-z-10 ' >Search for a job</Link>
                        
                        <Link href='/postajob' className='md:px-6 md:py-2 px-3 py-1 border md:mx-3 mx-1 font-bold md:text-lg text-base duration-500 hover:scale-105 before:duration-500  relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:bg-[white] before:transition-transform before:content-[""] hover:text-[#071b3f] before:hover:scale-y-100 before:-z-10' >Post a Job</Link>
                    </div>
                </div>
                <div className='hidden  brightness-105 md:block'>
                    <Image src='/bussiness-people-working-team-office-removebg-preview.png' width={1000} height={1000} alt=""></Image>
                    
                </div>
            </div> 
        </div>
    );
};

export default Hero;