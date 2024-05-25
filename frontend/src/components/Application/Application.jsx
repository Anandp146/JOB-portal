// Import necessary modules and packages
import axios from "axios"; // For making HTTP requests
import React, { useContext, useState } from "react"; // React imports
import toast from "react-hot-toast"; // For displaying toast messages
import { useNavigate, useParams } from "react-router-dom"; // For navigation
import { Context } from "../../main"; // Importing Context from main.js

// Application component
const Application = () => {
  // State variables using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  // Accessing user context from the main context
  const { isAuthorized, user } = useContext(Context);

  // For navigation
  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  // Getting the id parameter from URL
  const { id } = useParams();

  // Function to handle form submission
  const handleApplication = async (e) => {
    e.preventDefault();
    // Creating a new FormData object to send form data including files
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      // Making a POST request to submit application data
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true, // To include cookies
          headers: {
            "Content-Type": "multipart/form-data", // Setting content type for FormData
          },
        }
      );
      // Resetting form fields after successful submission
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      // Showing success message using toast
      toast.success(data.message);
      // Redirecting to job listings page
      navigateTo("/job/getall");
    } catch (error) {
      // Handling errors and showing error message using toast
      toast.error(error.response.data.message);
    }
  };

  // Redirect if user is not authorized or is an employer
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    // <div className="">
    //   <p className="text-[30px] font-bold text-center align-middle justify-center ">
    //     Application
    //   </p>
    //   <form class="max-w-md mx-auto" onSubmit={handleApplication}>
    //     <div class="relative z-0 w-full mb-5 group">
    //       <input
    //         type="text"
    //         placeholder=""
    //         value={name}
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //       <label
    //         for="floating_first_name"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Name
    //       </label>
    //     </div>
    //     <div class="relative z-0 w-full mb-5 group">
    //       <input
    //         type="email"
    //         name="floating_email"
    //         id="floating_email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder=" "
    //         required
    //       />
    //       <label
    //         for="floating_email"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Email address
    //       </label>
    //     </div>
    //     <div class="relative z-0 w-full mb-5 group">
    //       <input
    //         type="text"
    //         placeholder=""
    //         name="floating_phone"
    //         id="floating_phone"
    //         value={phone}
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         onChange={(e) => setPhone(e.target.value)}
    //         required
    //       />

    //       <label
    //         for="floating_phone"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Phone
    //       </label>
    //     </div>
    //     <div class="relative z-0 w-full mb-5 group">
    //       <input
    //         type="text"
    //         placeholder=""
    //         id="address"
    //         value={address}
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         onChange={(e) => setAddress(e.target.value)}
    //       />

    //       <label
    //         for="address"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Your Address
    //       </label>
    //     </div>
    //     <textarea
    //       placeholder="CoverLetter..."
    //       value={coverLetter}
    //       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //       rows="4"
    //       onChange={(e) => setCoverLetter(e.target.value)}
    //     />
    //     <div className="max-w-lg mx-auto">
    //       <label
    //         class="block mb-2 text-sm font-medium text-gray-900"
    //         for="user_avatar"
    //       >
    //         Select Resume
    //       </label>
    //       <input
    //         type="file"
    //         accept=".pdf, .jpg, .png"
    //         onChange={handleFileChange}
    //         class="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
    //         // class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
    //         aria-describedby="user_avatar_help"
    //         id="user_avatar"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       class="text-white my-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    //     >
    //       Send Application
    //     </button>

    //   </form>
    // </div>

    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <h3 className="text-center font-bold font-serif">Application Form</h3>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
          <form onSubmit={handleApplication}>
            <div className="mb-5">
              <label
                for="name"
                className="block mb-2 text-sm font-medium font-sans text-gray-800"
              >
                Your Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <div className="mb-5">
              <label
                for="floating_email"
                className="block mb-2 text-sm font-medium font-sans text-gray-800"
              >
                Your Email
              </label>
              <input
                id="floating_email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="floating_phone"
                className="block mb-2 text-sm font-medium font-sans text-gray-800"
              >
                Phone
              </label>
              <input
                type="text"
                id="floating_phone"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="address"
                className="block mb-2 text-sm font-medium font-sans text-gray-800"
              >
                Your Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <div className="mb-5">
              <label
                for="coverLetter"
                className="block mb-2 text-sm font-medium font-sans text-gray-800"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                rows="4"
                onChange={(e) => setCoverLetter(e.target.value)}
                className="block w-full py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                for="file_input"
              >
                Select Resume
              </label>
              <input
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                aria-describedby="user_avatar_help"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                id="file_input"
                type="file"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Send Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
