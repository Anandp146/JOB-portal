import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];
  return (
    // <div className="categories font-serif">
    //   <h3 className="font-serif align-middle text-center justify-center font-medium">POPULAR CATEGORIES</h3>
    //   <div className="banner font-serif">
    //     {categories.map((element) => {
    //       return (
    //         <div className="card" key={element.id}>
    //           <div className="icon">{element.icon}</div>
    //           <div className="text font-serif">
    //             <p className="font-serif">{element.title}</p>
    //             <p className="font-serif">{element.subTitle}</p>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="categories font-serif grid grid-cols-1 md:grid-cols-3 gap-6">
      <h3 className="font-serif text-center justify-center text-2xl font-semibold md:col-span-3">
        POPULAR CATEGORIES
      </h3>
      <div className="banner font-serif md:col-span-3">
        {categories.map((element) => {
          return (
            <div
              className="card bg-white rounded-lg shadow-lg p-4"
              key={element.id}
            >
              <div className="flex items-center justify-center">
                <div className="icon text-4xl text-gray-600">
                  {element.icon}
                </div>
              </div>
              <div className="text font-serif mt-4">
                <p className="font-bold text-lg text-gray-800">
                  {element.title}
                </p>
                <p className="text-sm text-gray-600">{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
