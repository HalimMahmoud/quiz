import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface CourseCardProps {
  imageUrl: string;
  title: string;
  date: string;
  enrolledStudents: number;
  onOpenClick?: () => void;
}

const UpcommingCard: React.FC<CourseCardProps> = ({
  imageUrl,
  title,
  date,
  enrolledStudents,
  onOpenClick,
}) => {
  return (
    <div className="course-card w-full max-w-md mx-auto bg-white rounded-xl border border-gray-300 overflow-hidden md:max-w-2xl transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 h-48 md:h-auto">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </div>

        <div className="p-6 md:w-4/5">
          <div className="uppercase tracking-wide text-sm text-black-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500">{date}</p>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              No. of student's enrolled:{" "}
              <span className="font-bold">{enrolledStudents}</span>
            </p>
            <button
              onClick={onOpenClick}
              className="px-4 py-2 text-black rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Open
              <span className="bg-green-500 p-1 rounded-full">
                <FiArrowRight className="h-4 w-4 text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcommingCard;
