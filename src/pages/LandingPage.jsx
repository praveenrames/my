import React from "react";
import { Link } from "react-router-dom";

import FocusZone from '../assets/icon/login-title.jpg';
import homepageImage from '../assets/images/landingpage-img.jpg';

const LandingPage = () => {
    return (
        <section className="w-screen h-screen flex flex-row place-content-between">
            <div className="flex flex-col w-3/5 pl-24 pt-12">
              <div id='header' className="flex flex-row items-center">
                <img src={FocusZone} className="flex flex-row items-center"/>


              </div>

              <div id='slogan' className="w-2/3">
                 <h1 className="text-6xl text-darkblue pt-40">
                    A step ahead in managing tasks.
                 </h1>
                 <p className="text-base w-2/3 pt-8 pb-14">
                   Streamline tasks, track productivity, <br /> build projects like no other.
                   Do it with{' '}
                   <em>
                      <strong>Focus Zone</strong>
                   </em>
                   .
                 </p>
                 <Link 
                   to={'/login'}
                   className="text-white font-bold bg-brightblue hover:bg-brighterblue hover:scale-110 rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Log in
                </Link>
                <Link
                  to={'signup'}
                  className="text-darkblue font-bold bg-white hover:brightness-95 rounded-lg text-sm px-6 py-2.5 text-center"
                >
                    Sign up
                </Link>
              </div>
            </div>
            <div className="absolute right-12 w-2/4 pt-8 px-16 mr-16">
              <img src={homepageImage} alt='homepage image'/>
            </div>
        </section>
    );
};

export default LandingPage;