import React from "react";
import men from "../../../assets/Men's.jpeg";
import girl from "../../../assets/user img.png";
import { FiArrowRight } from "react-icons/fi";

interface CardProps {
  title: string;
  classRank: string;
  averageScore: string;
}

const StudentModel: React.FC<CardProps> = ({
  title,
  classRank,
  averageScore,
}) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-full max-w-[30rem] h-24 my-2 mx-auto shadow-sm bg-white relative">
      {/* Image container (20% width) */}
      <div className="w-1/5 h-full flex items-center justify-center flex-shrink-0 p-0 m-0">
        <img src={girl} alt="" className="w-full h-full object-cover block" />
      </div>

      {/* Content area (80% width minus arrow space) */}
      <div className="p-2 flex-1 flex flex-col justify-center h-full overflow-hidden pr-8">
        <h3 className="m-0 mb-1 text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <span>Class rank: {classRank}</span>
          <span className="text-gray-300">|</span>
          <span>Average score: {averageScore}</span>
        </div>
      </div>

      {/* Centered vertical arrow with circular background */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black rounded-full w-8 h-8 text-white cursor-pointer">
        <FiArrowRight className="text-base" />
      </div>
    </div>
  );
};

export default StudentModel;
