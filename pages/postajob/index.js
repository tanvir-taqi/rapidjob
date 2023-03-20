import LoadingSpinner from '@/components/LoadingSpinner';
import { AuthContext } from '@/utils/userContext/UserContext';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

const PostAJob = () => {
    const { user } = useContext(AuthContext)
    const [displayModal, setDisplayModal] = useState(false)
    const imagebbKey = process.env.NEXT_PUBLIC_image_key
    const [errorMsg, setErrorMsg] = useState('')
    const [jobpostLoading, setJobPostLoading] = useState(false)
    const router = useRouter()



    const handlePostAJob = (event) => {
        event.preventDefault();
        setJobPostLoading(true)
        const form = event.target;
        const email = user?.email;
        const company = form.company.value;
        const website = form.website.value;
        const jobtitle = form.jobtitle.value;
        const details = form.details.value;
        const responsibilities = form.responsibilities.value;
        const requirements = form.requirements.value;
        const experience = form.experience.value;
        const stipend = form.stipend.value;
        const jobtype = form.jobtype.value;
        const message = form.message.value;
        const location = form.location.value;
        const wfh = form.wfh.value;
        const image = form.companyLogo.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imagebbKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const photo = imgData.data.url;
                const job = {
                    recruiter:email,
                    logo:photo,
                    company,
                    website,
                    jobtitle,
                    details,
                    responsibilities,
                    requirements,
                    experience,
                    stipend,
                    jobtype,
                    message,
                    location,
                    wfh
                }

                fetch('https://rapidjob-vnxt.vercel.app/api/jobpost', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(job)
                })
                    .then(res => res.json())
                    .then(data => {
                        form.reset()
                        setJobPostLoading(false)
                        setDisplayModal(true)
                    })
                    .catch(err => {
                        console.error(err);
                        form.reset()
                        setJobPostLoading(false)
                        setErrorMsg("Something went wrong")
                    })
            })

    }
    // if(!user?.email){
    //     router.push("/join")
    // }
    if(jobpostLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
                {
            // job post modal
                displayModal && <div onClick={()=>setDisplayModal(false)} className='fixed top-0 right-0 z-50  bg-[#071b3fbb] text-white text-lg font-medium w-full h-screen flex justify-center items-center'>
                    <div className='flex flex-col items-center p-10 bg-[#071b3f] w-[300px] rounded-xl'>
                        <h1 className='text-3xl'>Congratulations!!</h1>
                        <h1>You Have Successfully Posted A Job</h1>
                       <p className='text-xs mt-12'>Click Anywhere to Continue</p>
                    </div>
                </div>
            }
            <div className='my-20'>
                <h1 className='text-3xl text-center font-bold text-[#071b3f] my-6'>Post A Job</h1>

                <div className='flex w-full justify-center'>
                    <form onSubmit={handlePostAJob} className='grid grid-cols-1 gap-5 md:w-2/3 w-full bg-[#63a0e55e] md:p-12 p-2 rounded-lg'>
                    <p className='text-red-500 font-semibold'>{errorMsg}</p>
                        <div className="form-control flex flex-col">
                            <label htmlFor="companyLogo" className='my-1 font-medium' >Company Logo</label>
                            <input type="file" name="companyLogo" id="companyLogo" className=' py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="company" className='my-1 font-medium' >Company Name</label>
                            <input type="text" name="company" id="company" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="website" className='my-1 font-medium' >Company Website</label>
                            <input type="text" name="website" id="website" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="jobtitle" className='my-1 font-medium' >Job Title</label>
                            <input type="text" name="jobtitle" id="jobtitle" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="details" className='my-1 font-medium' >Job Details</label>
                            <textarea name="details" id="details" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>

                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="responsibilities" className='my-1 font-medium' >Responsibilities</label>
                            <textarea name="responsibilities" id="responsibilities" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>

                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="requirements" className='my-1 font-medium' >Job Requirements</label>
                            <textarea name="requirements" id="requirements" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="experience" className='my-1 font-medium' >Experience(in years)</label>
                            <input type="number" name="experience" id="experience" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="stipend" className='my-1 font-medium' >Stipend (in USD/month)</label>
                            <input type="text" name="stipend" id="stipend" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="jobtype" className='my-1 font-medium' >Job Type (Full time/ Part time/Contractual/Internship)</label>
                            <input type="text" name="jobtype" id="jobtype" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="wfh" className='my-1 font-medium' >Remote/In Office/Hybrid</label>
                            <input type="text" name="wfh" id="wfh" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="location" className='my-1 font-medium' >Company Location</label>
                            <input type="text" name="location" id="location" className='px-4 py-1 rounded-md outline-none' />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="message" className='my-1 font-medium' >Special Message (Optional)</label>
                            <textarea name="message" id="message" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                        </div>
                        <div className="form-control flex flex-col items-end">
                            {
                                user?.email ?  <input type="submit" value='Post the job' name="company" id="company" className='px-4 py-1 rounded-md outline-none duration-300 w-56 bg-[#071b3e] hover:bg-[#071b3ed3] hover:scale-105 text-white font-bold ' />
                                : <Link href='/join' className='underline'>Sign In to View Details</Link>
                            }

                           
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostAJob;