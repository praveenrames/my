import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios.js';
axios;

const ChangePassword = ({
  passwordModalOpen,
  setPasswordModalOpen,
  userId,
  setProfileModalOpen,
}) => {
  const [status, setStatus] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [newPwd, setNewPwd] = useState();
  const [pwdFocus, setPwdFocus] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState();
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [pwdUpdated, setpwdUpdated] = useState(false);
  const oldPwdRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const togglePassword = () => {
    passwordVisibility === 'password'
      ? setPasswordVisibility('text')
      : setPasswordVisibility('password');
  };

  const handleClosePwdModal = () => {
    setPasswordModalOpen(false);
    setStatus(null);
    setpwdUpdated(false);
    setPasswordVisibility('password');
    setIsValidPwd(false);
    setValidMatch(false);
  };

  const handleCancelChange = () => {
    handleClosePwdModal();
    setProfileModalOpen(true);
  };

  useEffect(() => {
    const result = PWD_REGEX.test(newPwd);
    setIsValidPwd(result);
    const match = newPwd === confirmPwd;
    setValidMatch(match);
  }, [newPwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwd = {
      oldPassword: oldPwdRef.current.value,
      newPassword: pwdRef.current.value,
    };
    if (isValidPwd && validMatch) {
      try {
        await axios.put(`/edit/pwd/${userId}`, pwd, config);
        setStatus('Password updated successfully.');
        setpwdUpdated(true);
        setTimeout(handleClosePwdModal, 3000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus('Old password is incorrect, please try again.');
        } else {
          console.error(error);
          setStatus('Error in updating password, please try again.');
        }
      }
    }
  };
  return (
    <>
      {passwordModalOpen ? (
        <section>
          <div
            id='edit-profile'
            tabIndex='-1'
            className='overflow-y-auto overflow-x-hidden fixed z-50 pt-14 w-full inset-0 h-modal md:h-full'
          >
            <div className='relative p-4 w-1/3 h-full md:h-auto inset-x-1/3 inset-y-16'>
              <div className='relative bg-white rounded-lg shadow'>
                <button
                  type='button'
                  className='absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={handleClosePwdModal}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
                <div className='py-6 px-6 lg:px-8'>
                  <h1 className='text-xl font-bold tracking-tight text-darkblue pt-2'>
                    Update Password
                  </h1>
                  <p
                    className={`text-xs text-center w-full mt-4 p-4 rounded-lg ${
                      status == null
                        ? 'hidden'
                        : status.includes('success')
                        ? 'border border-brightblue text-brightblue'
                        : 'text-white visible bg-grey'
                    }`}
                  >
                    {status}
                  </p>
                  {!pwdUpdated ? (
                    <div className='space-y-6'>
                      <div className='flex flex-col gap-4'>
                        <form
                          onSubmit={handleSubmit}
                          className='flex flex-col w-full'
                        >
                          <div className='pt-4'>
                            <label
                              htmlFor='oldPassword'
                              className='text-sm mb-40 uppercase'
                            >
                              Old Password
                            </label>
                            <input
                              type={passwordVisibility}
                              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                              autoComplete='off'
                              id='oldPassword'
                              name='oldPassword'
                              ref={oldPwdRef}
                            />
                          </div>
                          <div className='pt-4'>
                            <label
                              htmlFor='newPassword'
                              className='text-sm mb-40 uppercase'
                            >
                              New Password
                            </label>
                            <input
                              type={passwordVisibility}
                              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                              id='newPassword'
                              name='newPassword'
                              autoComplete='off'
                              ref={pwdRef}
                              onChange={(e) => setNewPwd(e.target.value)}
                              onFocus={() => setPwdFocus(true)}
                              onBlur={() => setPwdFocus(false)}
                            />
                          </div>
                          <div
                            id='pwdnote'
                            className={
                              pwdFocus && !isValidPwd ? 'block' : 'hidden'
                            }
                          >
                            <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg mt-2'>
                              8 to 24 characters. <br />
                              Must include uppercase and lowercase letters, a
                              number and a special character. <br />
                              Allowed special characters:{' '}
                              <span aria-label='exclamation mark'>!</span>
                              <span aria-label='at symbol'>@</span>
                              <span aria-label='hashtag'>#</span>
                              <span aria-label='dollar sign'>$</span>
                            </p>
                          </div>
                          <div className='pt-4'>
                            <label
                              htmlFor='confirmPassword'
                              className='text-sm mb-40 uppercase'
                            >
                              Confirm Password
                            </label>
                            <input
                              type={passwordVisibility}
                              autoComplete='off'
                              className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                              id='confirmPassword'
                              name='confirmPassword'
                              onFocus={() => setMatchFocus(true)}
                              onBlur={() => setMatchFocus(false)}
                              onChange={(e) => setConfirmPwd(e.target.value)}
                              ref={confirmPwdRef}
                            />
                          </div>
                          <div
                            id='confirmnote'
                            className={
                              matchFocus && !validMatch ? 'block' : 'hidden'
                            }
                          >
                            <p className='text-xs bg-grey text-white w-2/3 p-4 rounded-lg mt-2'>
                              Password does not match.
                            </p>
                          </div>
                          <div className='flex-row pt-4'>
                            <input
                              type='checkbox'
                              onClick={togglePassword}
                              className='rounded-md'
                            />
                            <span className='text-sm pl-2'> Show Password</span>
                          </div>
                          <div className='flex flex-row w-full space-x-4 pt-8 pb-4'>
                            <button
                              type='submit'
                              className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold text-center'
                            >
                              Change Password
                            </button>

                            <button
                              type='button'
                              className='w-1/2 text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90'
                              onClick={handleCancelChange}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 w-full h-full bg-black z-30 opacity-40'></div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default ChangePassword;