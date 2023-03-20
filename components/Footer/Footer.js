import React from 'react';

const Footer = () => {
    return (
        <div className='bg-[#071b3f] py-8'>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold">Rapid Job</div>
                    
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-200 hover:text-white">About Us</a>
                        <a href="#" className="text-gray-200 hover:text-white">Contact Us</a>
                        <a href="#" className="text-gray-200 hover:text-white">Privacy Policy</a>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default Footer;