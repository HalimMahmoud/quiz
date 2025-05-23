import { Link } from "react-router-dom";
import { DialogDemo } from "./QuizDialog";
import { FaAddressBook } from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Results from "@/modules/SharedModules/Results/Results";
import UpcommingQuizes from "./UpcommingQuizes";
export default function Quizes() {
  return (
    <div className="grid grid-cols-12 gap-0 p-4">
        <div className="col-span-6 p-2">
        <div className="grid grid-cols-12 gap-2">
      <DialogDemo/>
          <Link
            to="/dashboard/questions"
            className=" col-span-12 md:col-span-6 lg:col-span-4 border  border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <BsFillQuestionSquareFill className="text-4xl mb-2" />
            <h1 className="text-xl font-bold text-center">Question Bank</h1>
          </Link>
          <Link
            to="/dashboard/results"
            className="col-span-12 md:col-span-6 lg:col-span-4 border  ] border-gray-400 p-8 rounded-xl flex flex-col items-center hover:bg-gray-100 transition"
          >
            <FaAddressBook className="text-4xl mb-2" />
            <h1 className="text-xl font-bold">Results</h1>
          </Link>
      </div>
      <UpcommingQuizes/>
      </div>
      <div className="col-span-6 ">
    
        <Results /> 
    </div>
    </div>
  )
}
