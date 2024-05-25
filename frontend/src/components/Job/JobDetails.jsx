import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="bg-white px-4 lg:px-12 my-4 justify-around">
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold">{job.title}</h2>
          <div className="flex items-center">
            <div className="bg-green-200 text-green-900 px-2 rounded-full mr-2">
              <FontAwesomeIcon
                icon={faCheckCircle}
                width={14}
              ></FontAwesomeIcon>
            </div>
            <span className="text-xl">{job.category}</span>
          </div>
          <div className="text-xl text-gray-800">
            <p>
              <strong>Country:</strong> <span>{job.country}</span>
            </p>
            <p>
              <strong>City:</strong> <span>{job.city}</span>
            </p>
            <p>
              <strong>Location:</strong> <span>{job.location}</span>
            </p>
          </div>
          <p className="text-xl leading-relaxed text-gray-600">
            {job.description}
          </p>
        </div>
        <div className="text-xl font-semibold">
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
        </div>
        <div>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link
              to={`/application/${job._id}`}
              // className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg"
              className="bg-blue-500  w-1/4 block hover:bg-blue-400 text-white font-bold py-2 rounded-lg border-b-4 px-4 border-blue-700 hover:border-blue-500 "
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
