import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection ">
        <div className="container w-1/2 align-middle justify-center p-4 font-serif font-bold ">
          <div className="title px-5 mx-[80px]">
            <h1 className="font-serif text-[50px] ">Find a job that suits</h1>
            <h1 className="font-serif text-[50px]">your interests and skills</h1>
            <p className="font-serif">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
            </p>
          </div>
          <div className="image ">
            <img src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?w=1060&t=st=1711259052~exp=1711259652~hmac=153d362348f6f5ffe2dd9442f4f06f04be82528835796fff74ec5e04810a0b19" alt="hero" />
          </div>

        </div>
        
        <div className="details ">
          {details.map((element) => {
            return (
              <div className="card font-serif" key={element.id}>
                <div className="icon font-serif">{element.icon}</div>
                <div className="content ">
                  <p className="font-serif">{element.title}</p>
                  <p className="font-serif">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
