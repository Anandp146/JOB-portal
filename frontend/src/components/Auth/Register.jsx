import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state while waiting for response
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with an error status
        toast.error(error.response.data.message);
      } else if (error.request) {
        // No response received from the server
        toast.error("No response received from the server.");
      } else {
        // Request was not made due to another error
        toast.error("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 ">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">
              Create a new account
            </h2>
            {/* <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p> */}
            <form className="gap-4 flex flex-col">
              <div className="p-2 mt-6 border rounded-xl">
                <form class="max-w-sm ">
                  <label for="Role" className="block mb-1 text-sm font-medium">
                    Select an Role
                  </label>
                  <select
                    id="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-xl text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                </form>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                className="p-2 mt-3 border rounded-xl"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="p-2 mt-3 border rounded-xl"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                className="p-2 mt-3 border w-full rounded-xl"
                placeholder="Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="relative ">
                <input
                  class="p-2 rounded-xl border w-full"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg> */}
              </div>
              <button
                className="bg-[#002D74] rounded-xl text-white py-2"
                type="submit"
                onClick={handleRegister}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Registering..." : "Register"}
              </button>
              {/* <button
                className="bg-[#002D74] rounded-xl text-white py-2"
                type="submit"
                onClick={handleRegister}
              >
                Register
              </button> */}
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-400" />
              <p className="text-center">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>If you have an account </p>
              {/* <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button> */}
              <Link
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                to={"/login"}
              >
                Login Now
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://cdni.iconscout.com/illustration/premium/thumb/searching-for-job-online-4487043-3738450.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
