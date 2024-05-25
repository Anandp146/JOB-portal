import React from "react";
// import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { FaUserPlus, FaSearch, FaPaperPlane } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <>
      {/* <div className="howitworks">
        <div className="container">
          <h3 className="font-serif font-medium">How Job Portal Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-gray-100 align-middle justify-center items-center py-10">
        <div className="container mx-auto px-4">
          <h3 className="font-serif font-semibold align-middle text-center  justify-center items-center text-3xl mb-6">
            How Job Portal Works
          </h3>
          <div className="grid lg:px-20 md:px-14 sm:px-10 grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <FaUserPlus className="text-3xl text-white mb-4 inline-block" />
              <p className="text-lg font-semibold text-white mb-2">
                Create Account
              </p>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, culpa.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <FaSearch className="text-3xl text-white mb-4 inline-block" />
              <p className="text-lg font-semibold text-white mb-2">
                Find a Job/Post a Job
              </p>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, culpa.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <FaPaperPlane className="text-3xl text-white mb-4 inline-block" />
              <p className="text-lg font-semibold text-white mb-2">
                Apply For Job/Recruit Suitable Candidates
              </p>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
