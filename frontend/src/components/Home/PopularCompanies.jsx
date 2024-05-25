import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: " Copenhagen, Dublin , Estonia",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Lathrop, California,United States",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Lathrop, California,United States",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <>
      {/* <div className="companies">
        <div className="container">
          <h3>TOP COMPANIES</h3>
          <div className="banner">
            {companies.map((element) => {
              return (
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{element.icon}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Positions {element.openPositions}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      <div className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="  mb-6 font-serif text-center justify-center text-2xl font-semibold">
            TOP COMPANIES
          </h3>
          <div className="flex flex-wrap justify-center -mx-4">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const CompanyCard = ({ company }) => {
  return (
    <div className="w-full font-serif sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 h-full">
        <div className="h-full flex flex-col justify-between">
          <div className="p-6">
            <div className="text-center align-middle justify-center">
              <div className="text-3xl  align-middle justify-center items-center text-gray-600 mb-4">
                {company.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2">{company.title}</h4>
              <p className="text-sm text-gray-600">{company.location}</p>
            </div>
          </div>
          <div className="bg-gray-600 text-white px-4 py-2 flex justify-between items-center">
            <span>Open Positions: {company.openPositions}</span>
            {/* <button className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
              View Details
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
