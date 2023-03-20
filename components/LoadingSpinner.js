import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
             <div className="w-12 h-12  my-20 rounded-full animate-spin border-8 border-solid border-[#63a0e5] border-t-transparent"></div>
        </div>
    );
};

export default LoadingSpinner;