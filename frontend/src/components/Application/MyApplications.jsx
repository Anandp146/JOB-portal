import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main"; // Importing Context from main.js
import axios from "axios"; // For making HTTP requests
import toast from "react-hot-toast"; // For displaying toast messages
import { useNavigate } from "react-router-dom"; // For navigation
import ResumeModal from "./ResumeModal"; // Importing ResumeModal component

// MyApplications component
const MyApplications = () => {
  // Accessing user context from the main context
  const { user } = useContext(Context);

  // State variables
  const [applications, setApplications] = useState([]); // To store user's applications
  const [modalOpen, setModalOpen] = useState(false); // To control the visibility of the resume modal
  const [resumeImageUrl, setResumeImageUrl] = useState(""); // To store the URL of the resume image

  // Checking authorization status
  const { isAuthorized } = useContext(Context);

  // For navigation
  const navigateTo = useNavigate();

  // Fetching user's applications on component mount
  useEffect(() => {
    try {
      // Fetching applications based on user's role
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            // Setting fetched applications in state
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            // Setting fetched applications in state
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      // Handling errors
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]); // Running effect when authorization status changes

  // Redirect if user is not authorized
  if (!isAuthorized) {
    navigateTo("/");
  }

  // Function to delete an application
  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // Displaying success message and updating application list after deletion
          toast.success(res.data.message);
          setApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      // Handling errors
      toast.error(error.response.data.message);
    }
  };

  // Function to open resume modal
  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  // Function to close resume modal
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="my_applications page">
      {/* {user && user.role === "Job Seeker" ? (
    <div className="container mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">My Applications</h1>
      {applications.length <= 0 ? (
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">No Applications Found</h4>
      ) : (
        applications.map((element) => {
          return (
            <JobSeekerCard
              element={element}
              key={element._id}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          );
        })
      )}
    </div>
  ) : (
    <div className="container mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">Applications From Job Seekers</h1>
      {applications.length <= 0 ? (
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">No Applications Found</h4>
      ) : (
        applications.map((element) => {
          return (
            <EmployerCard
              element={element}
              key={element._id}
              openModal={openModal}
            />
          );
        })
      )}
    </div>
  )}
  {modalOpen && (
    <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
  )} */}
      {user && user.role === "Job Seeker" ? (
        <div className="font-serif container">
          <h1 className="font-serif font-bold justify-center text-center">
            My Applications
          </h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container font-serif align-middle text-center justify-center">
          <h1 className="font-serif font-semibold ">
            Applications From Job Seekers
          </h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="items-center justify-center align-middle flex">
      <div className=" border border-gray-300 w-1/2  rounded-md shadow-md mb-4 flex flex-col sm:flex-row items-center justify-center">
        <div className=" w-full sm:w-1/3 p-2">
          <p className="mb-2">
            <span className="font-bold">Name:</span> {element.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {element.email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> {element.phone}
          </p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> {element.address}
          </p>
          <p className="mb-2">
            <span className="font-bold">Cover Letter:</span>{" "}
            {element.coverLetter}
          </p>
        </div>
        {/* <div className="w-full sm:w-2/3 p-4">
      <img
        src={element.resume.url}
        alt="resume"
        className="w-full h-auto cursor-pointer"
        onClick={() => openModal(element.resume.url)}
      />
    </div> */}
        <div className="w-full align-middle sm:w-1/2 p-4 flex flex-col justify-center md:items-end">
          <button
            className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-3"
            onClick={() => openModal(element.resume.url)}
          >
            Resume
          </button>
          <button
            className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => deleteApplication(element._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="items-center justify-center align-middle flex">
      <div class="bg-white rounded-lg shadow-md p-6 space-y-4 w-1/2 ">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-lg text-[30px] font-extrabold text-gray-800">
              {element.name}
            </p>
          </div>
        </div>
        <div class=" border-gray-300 mb-4 flex flex-col sm:flex-row items-center   justify-between">
          <div class="flex-1 space-y-1">
            <div class="flex ">
              <p class="font-medium text-gray-700">Email:</p>
              <p class="ml-2">{element.email}</p>
            </div>
            <div class="flex ">
              <p class="font-medium text-gray-700">Phone:</p>
              <p class="ml-2">{element.phone}</p>
            </div>
            <div class="mt-1 md:mt-0 flex ">
              <p class="font-medium text-gray-700">Address:</p>
              <p class="ml-2">{element.address}</p>
            </div>
            <div class="mt-1 md:mt-0 flex">
              <p class="text-lg font-medium text-gray-800">Cover Letter:</p>
              <p class="text-gray-700">{element.coverLetter}</p>
            </div>
          </div>
        </div>
        <div class="w-full align-middle sm:w-1/2 p-4 flex flex-col justify-center items-center md:items-end">
          <button
            className="select-none rounded-lg bg-gray-900 py-3 px-6 mt-2 text-center align-middle justify-center font-sans text-xs font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
            onClick={() => openModal(element.resume.url)}
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
};
