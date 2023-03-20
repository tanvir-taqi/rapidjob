import LoadingSpinner from '@/components/LoadingSpinner';
import { AuthContext } from '@/utils/userContext/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const Alljobs = () => {
    const { user, loading } = useContext(AuthContext)
    const [displayModal, setDisplayModal] = useState(false)
    const [applyForm, setapplyForm] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [jobs, setJobs] = useState([])
    const [jobsLoading,setJobsLoading] = useState(false)
    const router = useRouter()


    useEffect( ()=>{
        setJobsLoading(true)
        fetch(`https://rapidjob-vnxt.vercel.app/api/findjobs?searchValue=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            setJobsLoading(false)
            setJobs(data)
        })
        .catch(error => {
            setJobsLoading(false)
            console.error('Error fetching data:', error)
        })
    
    },[searchValue])

    const handleJobApply = (event, id) => {
        event.preventDefault()
        const form = event.target
        const email = user?.email
        const name = form.name.value
        const skills = form.skills.value
        const proects = form.proects.value
        const experience = form.experience.value
        const cctc = form.cctc.value
        const ectc = form.ectc.value
        const github = form.github.value
        const resume = form.resume.value
        const cover = form.cover.value

        const application = {
            email,
            name,
            skills,
            proects,
            experience,
            currentSalary: cctc,
            expSalary: ectc,
            github,
            resume,
            cover,
            jobID: id
        }
        fetch('https://rapidjob-vnxt.vercel.app/api/jobapply', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(application)
        })
            .then(res => res.json())
            .then(data => {
                form.reset()
                // setJobPostLoading(false)
                setDisplayModal(false)
            })
            .catch(err => {
                console.error(err);
                form.reset()
                // setJobPostLoading(false)
                // setErrorMsg("Something went wrong")
            })
    }
    // if(!user?.email){
    //     router?.push("/join")
    // }
    if (loading || jobsLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='py-20'>

            <div>
                <h1 className="text-3xl text-center font-bold text-[#071b3f]">Find Your Dream Job</h1>

                <div className='flex w-full my-12 justify-center'>
                    <div className='md:w-2/3 w-full p-1 bg-[#63a0e5b6] flex justify-center'>
                        <input onChange={(event)=>setSearchValue(event.target.value)} type="text" name='searchjob' className='outline-none p-1 text-lg font-medium rounded w-3/4' />
                        <label htmlFor="searchjob" className='md:px-6 md:py-2 px-3 py-1 border md:mx-3 mx-1 font-bold md:text-lg text-base duration-500 hover:scale-105 before:duration-500  relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:bg-[white] before:transition-transform before:content-[""] hover:text-[#071b3f] before:hover:scale-y-100 before:-z-10'>Search Jobs</label>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-1 gap-6 md:w-3/4 w-full mx-auto'>
                        {
                            jobs.map(job => <div
                                key={job._id}
                                className='grid md:grid-cols-3 grid-cols-1 bg-[#63a0e5b6] rounded items-center justify-center'>
                                <div className='flex items-center justify-start my-2'>
                                    <img src={job?.logo} className='w-8 h-8 rounded-full mx-1' alt="" />
                                    <h1 className="text-lg font-medium mx-2">{job?.company}</h1>
                                    <p>{job?.location}</p>
                                </div>
                                <div className='flex items-center justify-center  my-2'>
                                    <h1 className="text-lg font-bold">{job?.jobtitle}</h1>
                                    <p className='mx-3'>{job?.wfh}</p>
                                    <small className='font-medium'>{job?.jobtype}</small>
                                </div>
                                <div className='flex items-center justify-center my-2'>
                                    {
                                        user?.email ? <button className=' px-3 py-1 border  mx-1 font-bold md:text-lg text-base text-[#071b3f] bg-[#fff] duration-500 hover:scale-105 before:duration-500  relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:bg-[#071b3f] before:transition-transform before:content-[""] hover:text-white before:hover:scale-y-100 before:-z-10 ' onClick={() => setDisplayModal(true)}>View Details</button>
                                            : <Link href='/join' className='underline'>Sign In to View Details</Link>
                                    }

                                </div>

                                <div>

                                    {

                                        // job details modal
                                        displayModal && <div className='absolute top-0 right-0 z-50  overflow-y-scroll bg-[#071b3fbb] min-h-full text-black text-lg  w-full  flex justify-center items-center'>
                                            <div className='md:w-3/4 bg-white py-6 px-2 w-full'>
                                                <p onClick={() => setDisplayModal(false)} className='p-2 border border-black bg-[#fef] w-24  text-center rounded cursor-pointer'>Close</p>
                                                <div className='flex items-center justify-start my-4'>
                                                    <img src={job?.logo} className='w-8 h-8 rounded-full' alt="" />
                                                    <h1 className="text-lg font-medium mx-2">{job?.company}</h1>
                                                    <p>{job?.location}</p>
                                                </div>
                                                <div className='flex items-center justify-center  my-2'>
                                                    <h1 className="text-lg font-bold">Job Title: {job?.jobtitle}</h1>
                                                    <p className='mx-3'> <span className='font-bold'>Job Type:</span>  {job?.wfh} <small className='font-medium'>{job?.jobtype}</small></p>
                                                </div>
                                                <div className='flex items-center justify-center  my-2'>

                                                    <p className='mx-3'> <span className='font-bold'> Experience Required:</span>  {job?.experience}years </p>
                                                    <p className='mx-3'> <span className='font-bold'> Estimated Salary:</span>  {job?.stipend}USD/month </p>
                                                </div>
                                                <p className='my-4'> <span className='font-bold'>Description:</span> {job?.details}</p>
                                                <p className='my-4'> <span className='font-bold'>Responsibilities:</span> {job?.responsibilities}</p>
                                                <p className='my-4'> <span className='font-bold'>Requirements:</span> {job?.requirements}</p>
                                                <p className='my-4'> <span className='font-bold'></span> {job?.message}</p>
                                                {
                                                    job?.recruiter === user?.email && <button className=' px-3 py-1 border  mx-1 font-bold md:text-lg text-base text-[#071b3f] bg-[#fff] duration-500 hover:scale-105 before:duration-500  relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:bg-[#071b3f] before:transition-transform before:content-[""] hover:text-white before:hover:scale-y-100 before:-z-10 '
                                                        onClick={() => setapplyForm(!applyForm)}>Apply Now</button>
                                                }


                                                {/* // apply form */}
                                                {
                                                    applyForm && <div className='flex flex-col items-center w-full'>
                                                        <h1 className='text-3xl text-center font-bold text-[#071b3f] my-6'>Fill This Form</h1>
                                                        <form onSubmit={(event) => handleJobApply(event, job?._id)} className='grid grid-cols-1 gap-5 md:w-2/3 w-full bg-[#63a0e55e] md:p-12 p-2 rounded-lg'>
                                                            {/* <p className='text-red-500 font-semibold'>{errorMsg}</p> */}
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="email">Email</label>
                                                                <input defaultValue={user?.email} readOnly type="email" name="email" id="email" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="name">Name</label>
                                                                <input type="text" name="name" id="name" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="skills" className='my-1 font-medium' >Skills</label>
                                                                <textarea name="skills" id="skills" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="proects" className='my-1 font-medium' >Projects</label>
                                                                <textarea name="proects" id="proects" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="experience" className='my-1 font-medium' >Experience</label>
                                                                <textarea name="experience" id="experience" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="cctc">Current CTC</label>
                                                                <input type="text" name="cctc" id="cctc" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="ectc">Expected CTC</label>
                                                                <input type="text" name="ectc" id="ectc" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="github">GitHub/Portfolio</label>
                                                                <input type="text" name="github" id="github" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="resume">Resume(Google Drive Link)</label>
                                                                <input type="text" name="resume" id="resume" className='px-4 py-1 my-2 rounded-md outline-none' />
                                                            </div>
                                                            <div className="form-control flex flex-col">
                                                                <label htmlFor="cover" className='my-1 font-medium' >Cover Letter</label>
                                                                <textarea name="cover" id="cover" cols="30" rows="6" className='px-4 py-1 my-2 rounded-md outline-none' ></textarea>
                                                            </div>
                                                            <div className="form-control flex flex-col items-end">

                                                                <input type="submit" value='Apply for the job' name="company" id="company" className='px-4 py-1 rounded-md outline-none duration-300 w-56 bg-[#071b3e] hover:bg-[#071b3ed3] hover:scale-105 text-white font-bold ' />
                                                            </div>
                                                        </form>

                                                    </div>
                                                }

                                            </div>
                                        </div>

                                    }
                                </div>
                            </div>)

                        }
                    </div>
                </div>
            </div>




        </div>
    );
};


// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://rapidjob-vnxt.vercel.app/api/findjobs`)
//     const jobs = await res.json()

//     // Pass data to the page via props
//     return { props: { jobs } }
// }

export default Alljobs;