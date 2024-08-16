import React, {useState, useRef, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';

import signupImage from '../assets/images/signuppage-img.png';
import Title from '../assets/icon/login-title.jpg';
import LoadingSpinner from '../Components/ui-states/loadingSpinner.jsx';

const SIGNUP_URL = '/signup';

// Validate password 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupPage = () => {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState('password');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('hidden');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd]);

    const handleFormReset = () => {
        setUserFirstName('');
        setUserLastName('');
        setUserEmail('');
        setPwd('');
        setMatchPwd('');
    };
    const togglePassword = () => {
        passwordVisibility === 'password'
        ? setPasswordVisibility('text')
        : setPasswordVisibility('password');
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const valid = PWD_REGEX.test(pwd);
        if(!valid){
            setErrMsg('Invalid entry, please try again');
            return;
        }
        try {
            const response = await axios.post(
                SIGNUP_URL,
                JSON.stringify({
                    firstName: userFirstName,
                    lastName : userLastName,
                    email: userEmail,
                    password: pwd,
                }),

                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            );
            localStorage.setItem('token', JSON.stringify(response?.data?.token));
            navigate('/login');
            handleFormReset();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if(!error?.response){
                setErrMsg('No server Response');
                console.log(error);
            } else if (error.response?.status === 409) {
                setErrMsg('Email address already in use.');
            } else {
                setErrMsg('Failed to create account.');
            }
            errRef.current.focus();
        }
    };
  return (
    <>
     <section className='w-full h-full flex flex content-center'>
        <div className='flex flex-col w-1/2 px-20 h-screen justify-center'>
        <a href='/home'>
          <img src={Title} className='w-40 h-auto' />
        </a>
        <h2 className='text-4xl font-bold pt-4 text-left'>Sign up</h2>
        <p className='text-sm w-2/3 pb-4'>Create your account.</p>
        <div>
            <div className={errMsg ? 'block' : 'hidden'}>
                <p 
                 ref={errRef}
                 className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'
                 aria-live='assertive'
                 >
                    {errMsg}
                 </p>
            </div>
             <form onSubmit={handleSignupSubmit} className='w-full'>
                <div className='w-full flex flex-row'>
                    <label htmlFor='firstname'></label>
                    <input
                     type='text'
                     id='firstname'
                     autoComplete='off'
                     placeholder='First Name'
                     ref={userRef}
                     value={userFirstName}
                     onChange={(e) => setUserFirstName(e.target.value)}
                     required
                     className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block p-2.5 mt-6 mr-4 w-1/2'
                     />
                     <label htmlFor='lastname'></label>
                     <input
                      type='text'
                      id='lastname'
                      autoComplete='off'
                      placeholder='Last Name'
                      value={userLastName}
                      onChange={(e) => setUserLastName(e.target.value)}
                      required
                      className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block p-2.5 mt-6 w-1/2'
                      />
                </div>
                 
                 <label htmlFor='email'></label>
                 <input
                  type='email'
                  id='email'
                  placeholder='Email Address'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block p-2.5 mt-6 w-full'
                  />
                   <label htmlFor='pwd'></label>
                   <input
                    type={passwordVisibility}
                    id='pwd'
                    placeholder='Set Password'
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 inline-block p-2.5 mt-6 w-full'
                    />
                     <div
                      id='pwdnote'
                      className={
                          pwdFocus && !validPwd
                          ? 'block'
                          : 'hidden'
                      }>
                        <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'>
                        8 to 24 characters. <br/>
                        Must include uppercase and lowercase letters, a number and a special character. <br/>
                        Allowed special characters: {' '}
                        <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        </p>
                      </div>
                      <label htmlFor='confirmpwd'></label>
                      <input
                       type={passwordVisibility}
                       id='confirmpwd'
                       placeholder='Confirm Password'
                       value={matchPwd}
                       onChange={(e) => setMatchPwd(e.target.value)}
                       required
                       aria-invalid={validMatch ? 'false' : 'true'}
                       aria-describedby='confirmnote'
                       onFocus={() => setMatchFocus(true)}
                       onBlur={() => setMatchFocus(false)}
                       className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block w-full p-2.5 mt-6'
                    />
                    <div
                    id='confirmnote'
                    className={matchFocus && !validMatch ? 'block' : 'hidden'}
                >
                    <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg'>
                    Password dose not match.
                    </p>
                </div>
                  <div className='pt-4'>
                    <input
                      type='checkbox'
                      onClick={togglePassword}
                      className='rounded-md'
                    />
                     <span className='text-sm pl-2'>Show Password</span>
                  </div>
                  <div>
                    <button
                      disabled={!validPwd || !validMatch ? true : false}
                      className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center disabled:bg-grey disabled:opacity-30 disabled:cursor-not-allowed mt-8 flex justify-center'
                    >
                        {loading ? <LoadingSpinner /> : 'Sign up'}
                    </button>
                    <p className='text-sm pt-4'>
                        Already have an account?{' '}
                        <strong>
                            <Link to='/login' className='hover:underline hover:italic'>
                             Login in
                            </Link>
                        </strong>
                    </p>
                  </div>
             </form>
        </div>
        </div>
        <div className='bg-brightblue w-1/2 flex flex-col h-screen fixed right-0'>
         <div className='flex-col justify-center items-center m-auto'>
            <h2 className='text-3xl text-white w-full text-center justify-center pb-4'>
                Join the Focus Zone <br/> community today!
            </h2>
            <img src={signupImage} className='w-full h-auto px-14'
            />
         </div>
        </div>
     </section>
    </>
  );
};

export default SignupPage


