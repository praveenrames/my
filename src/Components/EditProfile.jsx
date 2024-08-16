import React, { useRef, useState } from 'react';
import axios from '../api/axios.js';

const EditProfile = ({
  handleProfileModalClose,
  profileModalOpen,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  userId,
  setUserImage,
  imagePreview,
  setImagePreview,
  setPasswordModalOpen,
}) => {
  const [fileName, setFileName] = useState('No file chosen.');
  const [selectedFile, setSelectedFile] = useState(null);
  const imageInputRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };

  const handleFormReset = () => {
    imageInputRef.current.files = null;
    setFileName('No file chosen.');
    handleProfileModalClose();
  };

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setFileName(uploadedImage.name);
      setSelectedFile(uploadedImage);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userImage', selectedFile);

    await axios
      .put(`/edit/user/${userId}`, formData, config)
      .then((response) => {
        setUserImage(response?.data.userImage);
        handleFormReset();
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
    };

    try {
      const response = await axios.put(`/edit/user/${userId}`, data, config);
      setFirstName(response?.data?.firstName);
      setLastName(response?.data?.lastName);
      setEmail(response?.data?.email);
      handleProfileModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById('imageInput').click();
  };

  const openPasswordModal = () => {
    handleProfileModalClose();
    setPasswordModalOpen(true);
  };

  return (
    <>
      {profileModalOpen ? (
        <section>
          <div
            id='edit-profile'
            tabIndex='-1'
            className='overflow-y-auto overflow-x-hidden fixed z-50 pt-2 w-full inset-0 h-modal md:h-full'
          >
            <div className='relative p-4 w-1/3 h-full md:h-auto inset-x-1/3 inset-y-16'>
              <div className='relative bg-white rounded-lg shadow'>
                <button
                  type='button'
                  className='absolute top-3 right-2.5 text-black bg-transparent hover:bg-lightgray hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={() => handleProfileModalClose()}
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
                  <h1 className='text-xl font-bold tracking-tight text-darkblue pb-6 pt-2'>
                    Edit Profile
                  </h1>

                  <div className='space-y-6'>
                    <div className='flex flex-col gap-4'>
                      <form className='flex flex-row pr-8 gap-6 '>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleImageChange}
                          id='imageInput'
                          className='hidden'
                          ref={imageInputRef}
                        />
                        <img
                          src={imagePreview}
                          alt=''
                          className=' border-lightergray w-16 h-16 rounded-full object-cover'
                        />
                        <div>
                          <p className='text-xs italic truncate w-28 max-h-10 overflow-hidden'>
                            {fileName}
                          </p>

                          <button
                            className='text-xs  font-bold py-2 px-3 rounded-lg text-brightblue border border-brightblue text-center hover:opacity-80 self-center my-auto mr-4'
                            onClick={handleImageClick}
                          >
                            Upload
                          </button>

                          <button
                            type='submit'
                            onClick={handleUpdateImage}
                            className='w-fit text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-xs font-bold text-center mt-4 px-4 py-2'
                            style={{
                              visibility:
                                fileName !== 'No file chosen.'
                                  ? 'visible'
                                  : 'hidden',
                            }}
                          >
                            Update Photo
                          </button>
                        </div>
                      </form>

                      <form
                        onSubmit={handleSubmit}
                        className='flex flex-col w-full'
                      >
                        <div className='pt-4'>
                          <label
                            htmlFor='firstName'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            First Name
                          </label>
                          <input
                            type='text'
                            maxLength={11}
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            autoComplete='off'
                            id='firstName'
                            name='firstName'
                            ref={firstNameRef}
                            defaultValue={firstName}
                          />
                        </div>
                        <div className='pt-4'>
                          <label
                            htmlFor='lastName'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            Last Name
                          </label>
                          <input
                            type='text'
                            maxLength={11}
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            id='lastName'
                            name='lastName'
                            ref={lastNameRef}
                            defaultValue={lastName}
                          />
                        </div>
                        <div className='pt-4'>
                          <label
                            htmlFor='email'
                            className='text-sm opacity-50  mb-40 uppercase'
                          >
                            Email Address
                          </label>
                          <input
                            type='email'
                            className='bg-gray-50 border border-lightgray text-black text-sm rounded-lg focus:ring-brightblue focus:border-blue-500 block p-2.5 w-full'
                            id='email'
                            name='email'
                            ref={emailRef}
                            defaultValue={email}
                          />
                        </div>

                        <div className='flex flex-row w-full space-x-4 pt-9'>
                          <button
                            type='submit'
                            className='w-full text-white bg-brightblue hover:bg-brighterblue focus:ring-4 focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold text-center'
                          >
                            Update Profile
                          </button>

                          <button
                            type='button'
                            className='w-full text-black bg-lightgray focus:outline-none focus:ring-lightgray rounded-lg text-sm font-bold px-5 py-2.5 text-center hover:brightness-90'
                            onClick={() => handleProfileModalClose()}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                      <span className='pt-8 w-full border-b'></span>
                      <div className=' pb-4 flex flex-row place-content-between items-center'>
                        <p className='text-xs font-bold opacity-80 uppercase'>
                          Change Password
                        </p>
                        <button
                          onClick={openPasswordModal}
                          className='text-xs  font-bold py-2 px-3 rounded-lg
                        bg-lightergray text-gray border text-center hover:opacity-80 self-center my-auto'
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
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

export default EditProfile;