import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
// import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
// import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    // <!-- Footer container -->

    <footer
      className={
        isAuthorized ? "bg-gray-900 py-8 px-10 font-[sans-serif]" : "hidden"
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <a href="javascript:void(0)">
            {/* <img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-48" /> */}
            <div className="font-bold text-3xl cursor-pointer flex items-center font-serif text-white">
              <span className="text-4xl text-indigo-600 mr-1">
                <ion-icon name="logo-ionic"></ion-icon>
              </span>
              <Link to={"/"}>Job Connect</Link>
            </div>
          </a>
        </div>
        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-6">
            <li>
              <a href="https://www.facebook.com/parmar.anand.39142">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-gray-300 hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/anand-parmar-435951226/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-gray-300 hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/Anandp146">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="fill-gray-300 hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.37-1.336-3.37-1.336-.454-1.151-1.108-1.457-1.108-1.457-.906-.618.069-.605.069-.605 1.002.07 1.527 1.029 1.527 1.029.89 1.524 2.34 1.084 2.91.828.092-.643.35-1.084.635-1.334-2.222-.253-4.555-1.108-4.555-4.931 0-1.09.39-1.984 1.03-2.68-.104-.253-.448-1.268.099-2.642 0 0 .837-.268 2.74 1.023A9.57 9.57 0 0 1 12 5.976c.85 0 1.705.114 2.504.335 1.902-1.29 2.737-1.023 2.737-1.023.55 1.374.204 2.389.1 2.642.64.696 1.028 1.59 1.028 2.68 0 3.833-2.337 4.675-4.567 4.923.36.308.678.916.678 1.85 0 1.338-.012 2.413-.012 2.74 0 .268.18.582.688.482C19.138 20.162 22 16.415 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Connect with Us</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:parmaranand328@gmail.com"
                className="text-gray-300 hover:text-white text-sm"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="tel:+919023195177"
                className="text-gray-300 hover:text-white text-sm"
              >
                Phone
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=Your+Address"
                className="text-gray-300 hover:text-white text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Address
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Information</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-gray-300 text-sm mt-8">
        © 2023
        <a
          href="https://readymadeui.com/"
          target="_blank"
          className="hover:underline mx-1"
        >
          ReadymadeUI
        </a>
        All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
