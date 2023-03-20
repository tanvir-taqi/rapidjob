import LoadingSpinner from '@/components/LoadingSpinner';
import { AuthContext } from '@/utils/userContext/UserContext';
import Image from 'next/image';
import {  useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { BiBullseye, BiSleepy } from 'react-icons/bi';

const Join = () => {
    const [loginPage, setLoginPage] = useState(true)
    const [showPass, setShowPass] = useState(false)
    const { login, setLoading, loading, createUser, userUpdate } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('')
    const imagebbKey = process.env.NEXT_PUBLIC_image_key
    const router = useRouter();


    // login handler
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                setLoading(false)

                router.push('/');
                form.reset()
            })
            .catch(error => {
                form.reset()
                setLoading(false)
                setErrorMsg("Wrong email or password")
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })
    }

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        const name = form.name.value;

        if (password !== confirm) {
            setErrorMsg("Password didn't match!!")
            return
        } else {
            const image = form.img.files[0]
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
                    const userProfile = {
                        name,
                        email,
                        photo
                    }
                    createUser(email, password)
                        .then(result => {
                            const user = result.user;
                            const userInfo = {
                                displayName: name,
                                photoURL: photo
                            }
                            console.log("userInfo outside userUpdate",userInfo);
                            console.log("user",user);
                            if(user){
                                // userUpdate(userInfo)
                                // .then(() => {
                                    console.log("userInfo in userUpdate");
                                    addUserToDb(userProfile)
                                    
                                // })
                                // .catch(err => {
                                //     setLoading(false)
                                //     console.log(err)
                                //     setErrorMsg("Something went wrong")
                                // });
                            }
                           
                        })
                        .catch(error => {
                            setLoading(false)
                            if (error) {
                                setErrorMsg("Password should be at least 6 characters")
                            }

                        });
                })
                .catch(err => {
                    form.reset()
                    setLoading(false)
                    setErrorMsg("Something went wrong")
                })
        }
    }

    // add user to the database
    const addUserToDb = (profile) => {
         fetch('http://localhost:3000/api/userpost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then(data => {
            
            router.push('/');
            setLoading(false)
        })
        .catch(err => {
            console.error(err);
            setLoading(false)
            setErrorMsg("Something went wrong")
        })

    }

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='my-20'>
            <div className='grid grid-cols-1 md:grid-cols-[5fr,7fr] gap-6 md:p-12 p-4'>
                <div >
                    <Image src='/join.png' width={1000} height={1000} alt=""></Image>

                </div>
                <div>

                    {
                        loginPage ?
                            // ======== sign in component =========================
                            <>
                                <div className="  w-full flex justify-center">
                                    <div className='p-10 bg-[#63a0e55e] w-96'>
                                        <h1 className="text-center font-bold text-2xl">Sign In</h1>
                                        <form onSubmit={handleLogin}>
                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="email" className='font-bold'>Email</label>
                                                <input type="email" name="email" id="email" placeholder="Email" className="p-2 w-full" />
                                            </div>
                                            <div className='flex flex-col my-3'>
                                                <div className='flex justify-between items-center'>
                                                    <label htmlFor="password" className='font-bold'>Password</label>
                                                    <span onClick={() => setShowPass(!showPass)}>
                                                        {
                                                            showPass ?
                                                                <BiSleepy className='text-red-600'></BiSleepy>
                                                                :
                                                                <BiBullseye className='text-stone-600' ></BiBullseye>

                                                        }
                                                    </span>
                                                </div>
                                                <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Password" className="p-2 w-full" />
                                            </div>
                                            <p className='text-red-500 font-semibold'>{errorMsg}</p>

                                            <input type="submit" className='font-bold text-lg bg-[#63a0e5b6] py-2 px-4 rounded-lg my-3 cursor-pointer' value="Sign In" />
                                        </form>
                                        <h4>New to <strong>Rapid Job?</strong> <button onClick={() => setLoginPage(false)} className='text-[#000f20] underline'>Create Account</button></h4>
                                    </div>

                                </div>
                            </>
                            // ======== sign up component =========================
                            : <>
                                <div className="  w-full flex justify-center">
                                    <div className='p-10 bg-[#63a0e55e] w-96'>
                                        <h1 className="text-center font-bold text-2xl">Sign Up</h1>
                                        <form onSubmit={handleSignUp}>
                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="name" className='font-bold'>Name</label>
                                                <input type="text" name="name" id="name" placeholder="Name" className="p-2 w-full" />
                                            </div>
                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="email" className='font-bold'>Email</label>
                                                <input type="email" name="email" id="email" placeholder="Email" className="p-2 w-full" />
                                            </div>
                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="img" className='font-bold'>Profile Picture</label>
                                                <input type="file" name="img" id="img" placeholder="Profile Picture" className="p-2 w-full" />
                                            </div>

                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="password" className='font-bold'>Password</label>
                                                <input type='password' name="password" id="password" placeholder="Password" className="p-2 w-full" />
                                            </div>
                                            <div className='flex flex-col my-3'>
                                                <label htmlFor="confirm" className='font-bold'>Confirm Password</label>
                                                <input type="password" name="confirm" id="confirm" placeholder="Confirm Password" className="p-2 w-full" />
                                            </div>
                                            <p className='text-red-500 font-semibold'>{errorMsg}</p>

                                            <input type="submit" className='font-bold text-lg bg-[#63a0e5b6] py-2 px-4 rounded-lg my-3 cursor-pointer' value="Sign Up" />
                                        </form>
                                        <h4>Already have an account? <button onClick={() => setLoginPage(true)} className='text-[#000f20] underline'>Sign In Now</button></h4>
                                    </div>

                                </div>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Join;