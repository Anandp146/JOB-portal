import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Collapse } from "@material-tailwind/react";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { toast } from "react-hot-toast";
export default function NavbarDefalut() {
  const [openNav, setOpenNav] = React.useState(false);
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const handleLinkClick = () => {
    setShow(false);
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const Links = [
    { name: "Home", link: "/" },
    { name: "All Jobs", link: "/job/getall" },
    {
      name:
        user && user.role === "Employer"
          ? "Applicant's Applications"
          : "My Applications",
      link: "/applications/me",
    },
    user && user.role === "Employer"
      ? { name: "Post New Job", link: "/job/post" }
      : null,
    user && user.role === "Employer"
      ? { name: "View Your Jobs", link: "/job/me" }
      : null,
  ].filter(Boolean);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {Links.map((link, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          {/* Use Link instead of anchor tag */}
          <Link to={link.link} className="flex items-center">
            {link.name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar
      className={
        isAuthorized
          ? "shadow-md mx-auto max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4"
          : "hidden"
      }
    >
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 rounded-xl px-2 font-sans bg-blue-900 text-white font-extrabold "
        >
          Job Connect
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button
            variant="text"
            onClick={handleLogout}
            size="sm"
            className="hidden bg-gray-900 text-white lg:inline-block"
          >
            <span>Log Out</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto px-6 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container text-black font-bold font-mono mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              onClick={handleLogout}
              variant="text"
              size="sm"
              className="bg-gray-900 text-white"
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
