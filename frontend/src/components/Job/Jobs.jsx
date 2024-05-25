import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page ">
      <div className="container">
        <h1 className="text-3xl font-serif lg:text-4xl xl:text-5xl font-bold mb-8">
          ALL AVAILABLE JOBS
        </h1>
        <div className="banner grid grid-cols-1 lg:grid-cols-2 gap-4">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div
                  key={element._id}
                  className="max-w-sm p-6 bg-white border gap-3 border-gray-200 rounded-lg shadow  "
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {element.title}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700">
                    {element.category}
                  </p>
                  <p className="mb-3 font-normal text-gray-700">
                    {element.country}
                  </p>
                  <Link
                    to={`/job/${element._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Job Details
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
