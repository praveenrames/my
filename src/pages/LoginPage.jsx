import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Components/ui-states/loadingSpinner.jsx';

import axios from '../api/axios.js';
import FocusZone from '../assets/icon/login-title.jpg';
import loginImage from '../assets/images/loginpage-img.png';

const LOGIN_URL = '/login';
const DEMO_URL = '/demouser';

const LoginPage = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [userEmail, setUserEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState('password');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, pwd]);

    const togglePassword = () => {
        passwordVisibility === 'password'
        ? setPasswordVisibility('text')
        : setPasswordVisibility('password');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email: userEmail, password: pwd }),
                {
                    headers: {   
                        'Content-Type': 'application/json', 
                     },
                     withCredentials: true,
                }
            );
            localStorage.setItem('token', JSON.stringify(response?.data?.token));
            navigate('/dashboard');
            setUserEmail('');
            setPwd('');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if(!error?.response) {
             setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Invalid credentials, please try again')
            } else if (error.response?.status === 401) {
                setErrMsg('Invalid credentials, please try again')
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const handleLoginDemoUser = async () => {
        setLoading(true);
        try {
           const response = await axios.post(DEMO_URL,
            {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true,
            });
            localStorage.setItem('token', JSON.stringify(response?.data?.token));
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setErrMsg('No Server Response');
            console.log(error);
        }
    }

    return (
        <section className='w-full h-full flex flex-row content-center'>
            <div className='flex flex-col w-1/2 px-20 justify-center h-screen'>
              <a href='/'>
                <img src={FocusZone} className='w-40 h-auto' />
              </a>
              <h2 className='text-xl font-bold text-darkblue pt-4 text-left'>Log in</h2>
              <p className='text-sm w-2/3 pb-4'>
                Please enter your login details
              </p>
              <div className={errMsg ? 'block' : 'hidden'}>
                <p 
                  ref={errRef}
                  aria-live='assertive'
                  className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'
                >
                    {errMsg}
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className='w-full'>
                  <label htmlFor='email'></label>
                <input 
                    type='email'
                    id='email'
                    placeholder='Email Address'
                    value={userEmail}
                    ref={emailRef}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6'
                />
                <label htmlFor='password'></label>
                <input
                 type={passwordVisibility}
                 id='password'
                 placeholder='password'
                 value={pwd}
                 onChange={(e) => setPwd(e.target.value)}
                 required
                 className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6'
                />
                <div className='pt-4'>
                    <input
                      type="checkbox"
                      onClick={togglePassword}
                      className='rounded-md'
                    />
                    <span className='text-sm pl-2'>Show Password</span>
                </div>

                <div>
                    <button className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-30 disabled:cursor-not-allowed mt-8 flex justify-center'>
                        {loading ? <LoadingSpinner /> : 'Log in'}
                    </button>
                    <p className='text-xs pt-4'>
                        Don't have an account?{' '}
                        <Link 
                          to='/signup'
                          className='font-bold hover:italic hover:underline'
                        >
                            Sign Up.
                        </Link> <br /> or <a href='#' onClick={handleLoginDemoUser} className='font-bold hover:italic hover:underline'>Log in as Demo User.</a>
                    </p>
                </div>
              </form>
            </div>
            <div className='bg-brightblue w-2/3 flex flex-col'>
              <div>
                <h2 className='text-4xl text-white pt-24 pl-24 w-full'>
                    Welcome back to Focus Zone!
                </h2>
                <p className='text-2xl text-white pt-1 pl-24 w-2/3'>
                    Your tasks are Waiting
                </p>
                <img 
                 src={loginImage}
                 alt='task cards'
                 className='px-20 pt-8 w-full h-auto'
                />
              </div>
            </div>
        </section>
    );
};

export default LoginPage;
